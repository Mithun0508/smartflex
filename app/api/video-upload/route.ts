// file: app/api/video-upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔐 Cloudinary Signature Logic
    // Hum video file ko handle nahi karenge, sirf permission denge.
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Compression Settings (H264, 720p, optimized bitrate)
    const eager = "w_1280,h_720,c_limit,vc_h264,crf_28,ac_aac"; 
    const folder = "smartflex/videos";

    const paramsToSign = {
      timestamp,
      folder,
      eager,
      resource_type: "video",
    };

    // Generate SHA-1 Signature using Cloudinary SDK
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    // Return all credentials to Frontend
    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      eager,
      folder,
    });

  } catch (error: any) {
    console.error("Signature Error:", error);
    return NextResponse.json(
      { error: "Could not generate upload signature" },
      { status: 500 }
    );
  }
}