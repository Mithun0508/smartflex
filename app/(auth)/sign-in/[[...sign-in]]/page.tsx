"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* ❌ Purana: redirectUrl="/dashboard"
         ✅ Naya: fallbackRedirectUrl ya forceRedirectUrl
      */}
      <SignIn fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard" />
    </div>
  );
}