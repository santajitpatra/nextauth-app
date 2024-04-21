import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters",
  }),
});

export const RegisterFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters",
  }),
  confirmPassword: z.string().min(4, {
    message: "Password must be at least 6 characters",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters",
  })
  .max(50, {
    message: "First name must be less than 50 characters",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters",
  })
   .max(50, {
    message: "Last name must be less than 50 characters",
  }),
});