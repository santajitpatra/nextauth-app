import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcript from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginFormSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = await bcript.compare(password, user.password);
          if (isPasswordValid) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
