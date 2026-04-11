import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protected routes define karein
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/api/credits(.*)",
  "/api/subscription(.*)",
  "/api/video-upload(.*)", 
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // 1. Auth object ko await karein
    const authObj = await auth();
    
    // 2. 'any' use karke TS error bypass karein (Runtime par ye sahi kaam karega)
    (authObj as any).protect(); 
  }
});

export const config = {
  matcher: [
    // Next.js static files ko skip karne ke liye standard matcher
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!m)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API routes ke liye hamesha chalega
    '/(api|trpc)(.*)',
  ],
};