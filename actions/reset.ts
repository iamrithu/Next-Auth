"use server";
import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendResetPasswordEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validedFields = ResetSchema.safeParse(values);

  if (!validedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const resetPAsswordToken = await generatePasswordResetToken(email);

  await sendResetPasswordEmail(
    resetPAsswordToken.email,
    resetPAsswordToken.token
  );

  return { success: "Reset email sent!" };
};
