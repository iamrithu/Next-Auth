"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { error } from "console";
import { generateVerification, generateTwoFactorToken } from "@/lib/token";
import { sendVerificationEmail, sendTwoFactorToken } from "@/lib/mail";
import { getTwoFactonTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTowfactorconfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fileds" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  const passwordsMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordsMatch)
    return {
      error: "Wrong password!",
    };
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerification(existingUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }
  if (existingUser.isTwoFactorEnable && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactonTokenByEmail(existingUser.email);

      if (!twoFactorToken) return { error: "Invalid code!" };
      if (twoFactorToken.token !== code) return { error: "Invalid code!" };
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "2F code expired!" };
      await db.towFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });
      const existingTwoFactorConfirmation =
        await getTowfactorconfirmationByUserId(existingUser.id);
      if (existingTwoFactorConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingTwoFactorConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorToken(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
