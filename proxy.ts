import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 🔥 Protected routes
const isProtectedRoute = createRouteMatcher([
  "/video-upload(.*)",
  "/social-share(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Agar protected route hai → login mandatory
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!m)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};