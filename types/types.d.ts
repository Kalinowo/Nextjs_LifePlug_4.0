import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: any;
    role?: Role;
  }

  interface Session {
    user: {
      id: any;
      role?: Role;
    } & DefaultSession["user"];
  }
}
