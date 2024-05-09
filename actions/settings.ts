"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { createVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import { z } from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  // If the user is a OAuth user, don't allow them to change their email or password
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // If the user is changing their email, send a verification email
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await createVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Email updated, please verify" };
  }

  // If the user is changing their password, validate the current password
  if (values.password && values.newPassword && dbUser.password) {
    const isPasswordValid = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated" };
};
