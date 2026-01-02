import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * 🔐 Only routes that REALLY need login
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
    "/((?!_next|favicon.ico).*)",
  ],
};
