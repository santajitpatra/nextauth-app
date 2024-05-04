import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { getTwoFactorcomfirmationById } from "./data/two-factor-confirmation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      
      //Prevent sign in if user has not verified their email
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorcomfirmationById(existingUser.id)

        if (!twoFactorConfirmation) return false;

        // If user has two factor enabled, delete the two factor confirmation
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
       
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
