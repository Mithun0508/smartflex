"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function ClerkAvatar() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse" />
    );
  }

  return (
    <UserButton 
      appearance={{ elements: { avatarBox: "w-8 h-8" } }}
      afterSignOutUrl="/"
    />
  );
}
