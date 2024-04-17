"use server";

import { LoginFormSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validator = LoginFormSchema.safeParse(values);

  if (!validator.success) {
    return {
      error: "Invalid email or password",
    };
  }
  return {
    success: "Successfully logged in",
  };
};
