import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(4)),
    newPassword: z.optional(z.string().min(4)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Please enter a new password",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Please enter a password",
      path: ["Password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

export const ResetFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
  code: z.optional(z.string()),
});

export const RegisterFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
  confirmPassword: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
  name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(50, {
      message: "First name must be less than 50 characters",
    }),
});
