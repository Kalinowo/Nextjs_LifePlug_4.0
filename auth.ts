import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User, Role } from "@prisma/client";

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, hashedPassword } = credentials as any;
        const user = await getUser(email);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(
          hashedPassword,
          user.hashedPassword as string
        );
        if (passwordsMatch) return user;
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role as Role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  jwt: {
    maxAge: 60, // Token also expires after 60 seconds
  },
});
