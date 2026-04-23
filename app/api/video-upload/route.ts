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
    const authData = await auth();
    const userId = authData.userId;

    // 🛠️ DEBUG LOG: Railway ke console mein check karein ye kya print kar raha hai
    console.log("Auth Check - UserID:", userId);

    // 🛑 AGGRESSIVE FIX: Agar production par Clerk session issue kar raha hai, 
    // toh hum verify karenge ki environment keys sahi hain ya nahi.
    if (!userId) {
       // Agar aap chahte hain ki bina login ke testing ho sake, 
       // toh niche wali line ko comment kar sakte hain. 
       // Abhi ke liye hum ise 401 hi rakhte hain par ek message ke saath.
       return NextResponse.json({ 
         error: "Unauthorized", 
         message: "Clerk could not verify your session. Please re-login." 
       }, { status: 401 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    
    // ✅ Environment variable se uthayein taaki baar-baar code na badalna pade
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "smartflex_video_preset"; 
    const folder = "smartflex/videos";
    
    // Video compression settings (HD 720p with optimized bitrate)
    const eager = "w_1280,h_720,c_limit,vc_h264,crf_28,ac_aac";

    const paramsToSign = {
      eager,
      folder,
      timestamp,
      upload_preset,
    };

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
    console.error("Upload API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}