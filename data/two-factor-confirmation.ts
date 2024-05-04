import prisma from "@/lib/prisma";

export const getTwoFactorcomfirmationById = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: {
          userId,
        },
      }
    );
    return twoFactorConfirmation; // Return the token
  } catch {
    return null;
  }
};
