import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // const isOnMain = nextUrl.pathname.startsWith("/main");
      const isOnValidRoute = ["/main", "/history", "/profile", "/anime"].some(
        (route) => nextUrl.pathname.startsWith(route)
      );
      if (isOnValidRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(`main`, nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
