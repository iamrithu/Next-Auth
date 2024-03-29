"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { error } from "console";
import { getUserByEmail } from "@/data/user";
import { generateVerification } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "User not found" };
  }
  //De-structure form data
  const { name, email, password } = validatedFields.data;

  //convert normal password to hashedpassword
  const hashedPassword = await bcrypt.hash(password, 10);

  //Check user existence;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already exist !" };
  }

  //set body content for
  const payload = {
    name,
    email,
    password: hashedPassword,
  };

  await db.user.create({
    data: payload,
  });

  const verificationToken = await generateVerification(email);
  if (verificationToken) {
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }

  //TODO : send verification code to email
  return { success: "Confirmation email sent!" };
};
