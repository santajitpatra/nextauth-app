"use server";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return {
      error: "Invalid token",
    };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid password",
    };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Invalid email address",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Password reset successfully",
  };
};
