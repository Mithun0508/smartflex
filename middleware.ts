import { clerkMiddleware } from "@clerk/nextjs/server";

// Hum temporarily protection hata rahe hain ye dekhne ke liye ki 401 jata hai ya nahi
export default clerkMiddleware(); 

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!m)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};