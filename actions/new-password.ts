"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getResetPasswordTokenByToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token!" };
  }
  const validedFields = NewPasswordSchema.safeParse(values);

  if (!validedFields.success) {
    return { error: "Invalid data!" };
  }
  const { password } = validedFields.data;
  const existingToken = await getResetPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token expired!" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      email: existingUser.email,
      password: hashedPassword,
    },
  });
  await db.resetPasswordToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return {
    success: "New password updated!",
  };
};
