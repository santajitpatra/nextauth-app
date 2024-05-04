import { v4 as uuidv4 } from "uuid";
import prisma from "./prisma";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const createTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expires = new Date(Date.now() + 1000 * 60 * 60);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};

export const createPasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 60);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};

export const createVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 60);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
