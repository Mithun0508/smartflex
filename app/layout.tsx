import "./globals.css";
import NavbarClient from "@/app/components/NavbarClient";
import Footer from "@/app/components/Footer";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";


export const metadata = {
  metadataBase: new URL("https://usesmartflex.com"),
  title: "SmartFlex – AI Video Compressor & Social Media Image Resizer",
  description:
    "SmartFlex is an AI-powered media tool to compress videos, resize images for social platforms, and optimize content instantly. Free 480p compression included.",
  keywords: [
    "video compressor",
    "AI video compression",
    "compress video online",
    "image resizer",
    "social media image size",
    "video optimization",
    "SmartFlex",
    "online compressor",
  ],
  authors: [{ name: "SmartFlex Team" }],

  openGraph: {
    title: "SmartFlex – AI Video Compressor & Image Resizer",
    description:
      "Compress videos, resize images, and optimize media instantly using AI.",
    url: "https://usesmartflex.com",
    siteName: "SmartFlex",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmartFlex Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SmartFlex – AI Video Compressor & Image Tools",
    description:
      "Fast video compression, social media image resizing, and more.",
    creator: "@smartflex",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      {/* ---- Clerk Blink Fix ---- */}
      <head>
        <link rel="preconnect" href="https://api.clerk.com" />
        <link rel="preconnect" href="https://img.clerk.com" />
      </head>

      <body className="min-h-screen flex flex-col bg-[#070B14] text-white font-inter">
        <Providers>
          {/* Navbar */}
          <NavbarClient />


          {/* Page Content */}
          <main className="flex-1 pt-24">{children}</main>

          {/* Footer */}
          <Footer />
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
