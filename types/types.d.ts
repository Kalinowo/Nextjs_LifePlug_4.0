import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: any;
    role?: Role;
    exp?: Number;
  }

  interface Session {
    user: {
      id: any;
      role?: Role;
      exp?: Number;
    } & DefaultSession["user"];
  }
}
