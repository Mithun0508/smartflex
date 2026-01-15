import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST() {
  const timestamp = Math.floor(Date.now() / 1000);

  const folder = "smartflex/videos";
  const eager = "h_480,vc_h264,ac_aac";
  const eager_async = "true";

  const paramsToSign = `eager=${eager}&eager_async=${eager_async}&folder=${folder}&timestamp=${timestamp}`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  return NextResponse.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    eager,
    eager_async,
    folder,
  });
}
