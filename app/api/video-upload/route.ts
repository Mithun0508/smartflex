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
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Compression Settings
    const eager = "w_1280,h_720,c_limit,vc_h264,crf_28,ac_aac"; 
    const folder = "smartflex/videos";
    // 👈 Naya Preset Name jo humne dashboard mein banaya
    const upload_preset = "smartflex_video_preset"; 

    const paramsToSign = {
      timestamp,
      folder,
      eager,
      upload_preset, // 🔥 Yeh add karna MUST hai signature validation ke liye
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
      upload_preset, // Frontend ko bhi bhej rahe hain taaki wo use kar sake
    });

  } catch (error: any) {
    console.error("Signature Error:", error);
    return NextResponse.json(
      { error: "Could not generate upload signature" },
      { status: 500 }
    );
  }
}