"use server";

import { RegisterFormSchema } from "@/schemas";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validator = RegisterFormSchema.safeParse(values);

  if (!validator.success) {
    return {
      error: "Invalid email or password",
    };
  }
  return {
    success: "Successfully logged in",
  };
};
