import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { getResetPasswordTokenByEmail } from "@/data/reset-password-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { date } from "zod";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);
  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const resetPasswordToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return resetPasswordToken;
};

export const generateVerification = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // will expires in one hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken?.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
  return verificationToken;
};
