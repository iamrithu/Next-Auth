import { db } from "@/lib/db";

export const getTwoFactonTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.towFactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
export const getTwoFactonTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.towFactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
