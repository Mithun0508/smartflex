import { NextRequest, NextResponse } from "next/server";
import { getCloudinary } from "@/lib/cloudinary";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    // ✅ Cloudinary free plan safe limit
    const MAX_VIDEO_SIZE = 40 * 1024 * 1024; // 40MB
    if (file.size > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        { error: "Free plan allows max 40MB video only" },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cloudinary = getCloudinary();

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "smartflex/videos",
        },
        (
          err: UploadApiErrorResponse | undefined,
          uploadResult: UploadApiResponse | undefined
        ) => {
          if (err || !uploadResult) {
            console.error("CLOUDINARY UPLOAD ERROR:", err);
            reject(err ?? new Error("Upload failed"));
          } else {
            resolve(uploadResult);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({
      ok: true,
      publicId: result.public_id,
      url: result.secure_url,
      bytes: result.bytes,
      format: result.format,
    });

  } catch (e: any) {
    console.error("[video-upload]", e);
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
