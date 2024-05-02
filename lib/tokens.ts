import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import prisma from "./prisma";

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