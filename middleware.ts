import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * 🔐 Only protect routes that need login
 */
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/api/credits(.*)",
  "/api/subscription(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // ✅ Only run middleware on protected routes
    "/dashboard(.*)",
    "/account(.*)",
    "/api/credits(.*)",
    "/api/subscription(.*)",
  ],
};
