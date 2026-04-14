import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/video-upload(.*)",
  "/api/credits(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // 1. Auth object mangwayein
    const authObj = await auth();
    
    // 2. Type checking bypass karke protect() call karein
    // Hum 'as any' isliye use kar rahe hain taaki TS chup ho jaye, 
    // runtime par Clerk ise handle kar lega.
    //if (typeof (authObj as any).protect === 'function') {
      //  (authObj as any).protect();
    //}
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!m)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};