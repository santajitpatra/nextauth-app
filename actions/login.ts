"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { createVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { LoginFormSchema } from "@/schemas";
import { create } from "domain";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validator = LoginFormSchema.safeParse(values);

  if (!validator.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { email, password } = validator.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Invalid email or password",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await createVerificationToken(existingUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: "Verification email sent",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password",
          };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
