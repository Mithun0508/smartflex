import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/api/video(.*)",
  "/api/video-upload(.*)",
  "/api/video-compress(.*)",
  "/api/image-upload(.*)",
  "/api/subscription(.*)",
  "/api/enterprise(.*)",
  "/social-share(.*)",
]);


export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)",
    "/api/(.*)",
  ],
};
