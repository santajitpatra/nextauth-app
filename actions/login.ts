"use server";

import { signIn } from "@/auth";
import { getTwoFactorcomfirmationById } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { createTwoFactorToken, createVerificationToken } from "@/lib/tokens";
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

  const { email, password, code } = validator.data;

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
      verificationToken.token
    );

    return {
      success: "Verification email sent",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return {
          error: "Invalid code",
        };
      }

      if (twoFactorToken.token!== code) {
        return {
          error: "Invalid code",
        };
      }
      
      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return {
          error: "Code has expired",
        };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfimation = await getTwoFactorcomfirmationById(
        existingUser.id
      );

      if (existingConfimation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfimation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
      
    } else {
      const twoFactorToken = await createTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        twoFactor: true,
      };
    }
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
