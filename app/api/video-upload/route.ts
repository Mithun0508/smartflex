import { NextRequest, NextResponse } from "next/server";
import { getCloudinary } from "@/lib/cloudinary";
import type {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const target = (form.get("target") as string) || "480p";

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    // 🔒 FREE PLAN VIDEO LIMIT (VERY IMPORTANT)
    const MAX_VIDEO_SIZE = 40 * 1024 * 1024; // 40 MB (Cloudinary free safe)
    if (file.size > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        { error: "Free plan allows max 40MB video only" },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const height =
      target === "1080p" ? 1080 :
      target === "720p"  ? 720  :
      480;

    const cloudinary = getCloudinary();

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "smartflex/videos",
          eager: [
            {
              height,
              crop: "scale",
              video_codec: "h264",
              audio_codec: "aac",
              quality: "auto",
            },
          ],
          eager_async: true,
        },
        (
          err: UploadApiErrorResponse | undefined,
          uploadResult: UploadApiResponse | undefined
        ) => {
          if (err || !uploadResult) {
            console.error("CLOUDINARY VIDEO ERROR:", err);
            reject(err ?? new Error("Video upload failed"));
          } else {
            resolve(uploadResult);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({
      ok: true,
      target,
      publicId: result.public_id,
      originalUrl: result.secure_url,
      status: "processing",
    });

  } catch (e: any) {
    console.error("[video-upload]", e);
    return NextResponse.json(
      { error: e?.message || "Compression failed" },
      { status: 500 }
    );
  }
}
