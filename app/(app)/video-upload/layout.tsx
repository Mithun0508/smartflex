import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Video Compressor Online – Compress MP4 Without Quality Loss | SmartFlex",
  description:
    "Compress videos online for free. Reduce video file size from 100MB to under 10MB in seconds. Free 480p compression with SmartFlex watermark. Upgrade to Pro for 720p HD with no watermark.",
  keywords: [
    "video compressor online",
    "compress video online free",
    "reduce video file size",
    "compress MP4 online",
    "video size reducer",
    "free video compressor",
    "compress video without losing quality",
    "online video compressor India",
    "SmartFlex video compression",
  ],
  openGraph: {
    title: "Free Video Compressor Online | SmartFlex",
    description:
      "Compress MP4 videos online. Reduce file size by up to 80% in seconds. Free 480p, Pro 720p HD.",
    url: "https://usesmartflex.com/video-upload",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Video Compressor – SmartFlex",
    description: "Compress videos online. Free 480p, Pro 720p HD. No software needed.",
  },
  alternates: {
    canonical: "https://usesmartflex.com/video-upload",
  },
};

export default function VideoUploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
