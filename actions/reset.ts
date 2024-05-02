"use server";

import { ResetFormSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { z } from "zod";
import { createPasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetFormSchema>) => {
  const validatedFields = ResetFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email address",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "Invalid email address",
    };
  }

  const passwordResetToken = await createPasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: "Reset email sent",
  };
};
