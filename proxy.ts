import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/api/credits(.*)",
  "/api/subscription(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/account(.*)",
    "/api/credits(.*)",
    "/api/subscription(.*)",
  ],
};
