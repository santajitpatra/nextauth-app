import * as z from "zod";


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
