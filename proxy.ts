import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 🔒 Protected routes - login mandatory
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/video-upload(.*)",
  "/social-share(.*)",
  "/account(.*)",
]);

// 🌐 Always public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/home(.*)",
  "/pricing(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/faq(.*)",
  "/feedback(.*)",
  "/privacy-policy(.*)",
  "/terms(.*)",
  "/refund-policy(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/cloudinary-webhook(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
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