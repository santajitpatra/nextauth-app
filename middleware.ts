import authConfig from "./auth.config";
import NextAuth from "next-auth";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn =!!req.auth;
  console.log("route middleware", req.nextUrl.pathname);
  console.log("Is logged in", isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
