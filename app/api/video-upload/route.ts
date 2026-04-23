import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // 🛠️ TEMPORARY BYPASS: Clerk check ko disable kar rahe hain testing ke liye
    // const { userId } = await auth(); 
    // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const timestamp = Math.floor(Date.now() / 1000);
    
    // Environment variable se preset uthayein (NEXT_PUBLIC_ prefix zaroori hai)
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "smartflex_video_preset"; 
    const folder = "smartflex/videos";
    
    // Compression settings
    const eager = "w_1280,h_720,c_limit,vc_h264,crf_28,ac_aac";

    const paramsToSign = {
      eager,
      folder,
      timestamp,
      upload_preset,
    };

    // Signature generate karna (Cloudinary Secret Key se)
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      eager,
      folder,
      upload_preset,
    });
  } catch (error: any) {
    console.error("Backend Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}