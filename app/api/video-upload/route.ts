import { NextRequest, NextResponse } from "next/server";
import { getCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cloudinary = getCloudinary();

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "smartflex/videos",
        },
        (err, result) => {
          if (err || !result) reject(err || new Error("Upload failed"));
          else resolve(result);
        }
      ).end(buffer);
    });

    const result: any = uploadResult;

    const compressedUrl = result.secure_url.replace(
      "/upload/",
      "/upload/c_scale,h_480/"
    );

    return NextResponse.json({
      ok: true,
      originalUrl: result.secure_url,
      compressedUrl,
    });
  } catch (err: any) {
    console.error("Video error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
