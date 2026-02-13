import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/auth/sign-in(.*)", 
  "/auth/sign-up(.*)",
  "/api(.*)"  // Make all API routes public (including /api/v1/business)
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
