"use client";

import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Video Compression", href: "/video-upload" },
    { name: "Image Adjustment", href: "/social-share" },
    { name: "Pricing", href: "/pricing" },
    { name: "Feedback", href: "/feedback" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Dashbord", href: "/dashboard" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#020712]/90 backdrop-blur-lg border-b border-[#0f1624]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="SmartFlex" className="h-7" />
          <span className="font-poppins text-lg font-semibold text-white">

          </span>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-poppins text-[15px] transition 
                ${isActive(link.href)
                  ? "text-[#16B6B0] font-semibold underline underline-offset-8"
                  : "text-gray-300 hover:text-[#16B6B0]"
                }
              `}
            >
              {link.name}
            </a>
          ))}

          {/* USER LOGGED IN */}
          <SignedIn>
            <div className="w-8 h-8 flex items-center justify-center">
              <UserButton
                showName={false}
                afterSignOutUrl="/"
                appearance={{
                  variables: {
                    colorPrimary: "#16B6B0",
                    colorBackground: "#0F1624",
                    colorText: "#E5E7EB",          // 👈 main text
                    colorTextSecondary: "#9CA3AF", // 👈 email + menu text FIX
                    colorInputBackground: "#05070D",
                    colorInputText: "#E5E7EB",
                    borderRadius: "14px",
                  },
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full border border-[#1b2335]",

                    userButtonPopoverCard:
                      "bg-[#0F1624] border border-[#1b2335] shadow-xl",

                    userButtonPopoverFooter: "hidden",

                    userButtonPopoverActionButton:
                      "text-gray-300 hover:text-white",

                    userButtonPopoverActionButtonText:
                      "text-gray-300",

                    userButtonPopoverActionButtonIcon:
                      "text-gray-400",

                    userButtonPopoverProfileDetails:
                      "text-gray-300",   // 👈 EMAIL AREA FIX
                  },
                }}
              />


            </div>
          </SignedIn>

          {/* USER LOGGED OUT */}
          <SignedOut>
            <a
              href="/sign-in"
              className="text-gray-300 hover:text-[#16B6B0] font-poppins text-[15px]"
            >
              Sign In
            </a>
            <a
              href="/sign-up"
              className="px-4 py-2 bg-[#16B6B0] text-black rounded-lg font-semibold font-poppins text-[15px] hover:opacity-90"
            >
              Sign Up
            </a>
          </SignedOut>
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden">
          <button
            className="text-white text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#020712] border-t border-[#0f1624] px-6 py-4">

          {/* Links */}
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block py-2 text-[15px] font-poppins transition 
                ${isActive(link.href)
                  ? "text-[#16B6B0] font-semibold"
                  : "text-gray-300 hover:text-[#16B6B0]"
                }
              `}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {/* Signed In (Mobile) */}
          <SignedIn>
            <div className="mt-4 border-t border-[#1b2335] pt-4">
              <div className="w-10 h-10">
                <UserButton
                  showName={false}
                  afterSignOutUrl="/"
                  appearance={{
                    variables: {
                      colorPrimary: "#16B6B0",
                      colorBackground: "#0F1624",
                      colorText: "#E5E7EB",          // 👈 main text
                      colorTextSecondary: "#9CA3AF", // 👈 email + menu text FIX
                      colorInputBackground: "#05070D",
                      colorInputText: "#E5E7EB",
                      borderRadius: "14px",
                    },
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full border border-[#1b2335]",

                      userButtonPopoverCard:
                        "bg-[#0F1624] border border-[#1b2335] shadow-xl",

                      userButtonPopoverFooter: "hidden",

                      userButtonPopoverActionButton:
                        "text-gray-300 hover:text-white",

                      userButtonPopoverActionButtonText:
                        "text-gray-300",

                      userButtonPopoverActionButtonIcon:
                        "text-gray-400",

                      userButtonPopoverProfileDetails:
                        "text-gray-300",   // 👈 EMAIL AREA FIX
                    },
                  }}
                />


              </div>
            </div>
          </SignedIn>

          {/* Signed Out (Mobile) */}
          <SignedOut>
            <div className="mt-4 border-t border-[#1b2335] pt-4 flex flex-col gap-3">
              <a
                href="/sign-in"
                className="text-gray-300 hover:text-[#16B6B0]"
                onClick={() => setOpen(false)}
              >
                Sign In
              </a>
              <a
                href="/sign-up"
                className="py-2 bg-[#16B6B0] text-black rounded-lg font-semibold text-center"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </a>
            </div>
          </SignedOut>
        </div>
      )}
    </header>
  );
}
