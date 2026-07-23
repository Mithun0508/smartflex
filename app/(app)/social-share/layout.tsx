import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Image Resizer – Resize for Instagram, Twitter, Facebook | SmartFlex",
  description:
    "Resize images for social media instantly. Perfect dimensions for Instagram Square, Instagram Portrait, Twitter Post, Twitter Header, and Facebook Cover. Free online image resizer.",
  keywords: [
    "social media image resizer",
    "resize image for Instagram",
    "Instagram image size",
    "Twitter image size",
    "Facebook cover photo size",
    "image resizer online free",
    "resize photo for social media",
    "Instagram post size 1080x1080",
    "social media image dimensions",
    "SmartFlex image resizer",
  ],
  openGraph: {
    title: "Social Media Image Resizer | SmartFlex",
    description:
      "Resize images for Instagram, Twitter, Facebook and more. Perfect dimensions instantly. Free online tool.",
    url: "https://usesmartflex.com/social-share",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Image Resizer – SmartFlex",
    description:
      "Instantly resize images for Instagram, Twitter, Facebook. Free online tool.",
  },
  alternates: {
    canonical: "https://usesmartflex.com/social-share",
  },
};

export default function SocialShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
