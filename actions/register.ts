"use server";

import { RegisterFormSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { createVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validator = RegisterFormSchema.safeParse(values);

  if (!validator.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { email, password, confirmPassword, name } =
    validator.data;
  const isPasswordValid = password === confirmPassword;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }
  
   if (!isPasswordValid) {
     return {
       error: "Passwords do not match",
     };
   }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await createVerificationToken(email);

  return {
    success: "Successfully logged in",
  };
};
