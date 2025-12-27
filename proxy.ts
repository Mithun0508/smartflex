import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/social-share(.*)",
  "/api/video-upload(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Agar route protected hai, aur user login nahi hai to redirect kare
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Next.js ke internal files skip karne ke liye pattern
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
  ],
};
