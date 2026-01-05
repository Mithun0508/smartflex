"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#16B6B0",
          colorBackground: "#0A0F1A",
          colorText: "#FFFFFF",
          colorTextSecondary: "#A1A1AA",
        },
        elements: {
          socialButtonsBlockButton: {
            backgroundColor: "#0F1624",
            color: "#FFFFFF",
            border: "1px solid #1b2335",
          },
          socialButtonsBlockButtonText: {
            color: "#FFFFFF",
          },
          socialButtonsBlockButtonArrow: {
            color: "#FFFFFF",
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
