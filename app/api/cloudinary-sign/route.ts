import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = `timestamp=${timestamp}&folder=smartflex/videos`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  return NextResponse.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder: "smartflex/videos",
  });
}
