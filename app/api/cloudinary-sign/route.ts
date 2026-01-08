import { NextResponse } from "next/server";
import { getCloudinary } from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function POST() {
  const { userId } = await auth(); // ✅ FIX HERE

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudinary = getCloudinary();
  const timestamp = Math.round(Date.now() / 1000);

  const params = {
    timestamp,
    folder: "smartflex/videos",
    resource_type: "video",
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder: params.folder,
  });
}
