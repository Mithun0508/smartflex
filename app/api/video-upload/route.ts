import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const target = (form.get("target") as string) || "480p";

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    const MAX_SIZE = 180 * 1024 * 1024; // 180MB safe cap
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large for current plan (max 180MB)" },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "smartflex/videos",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    const scale = target === "1080p" ? 1080 : target === "720p" ? 720 : 480;

    const eagerResult = await cloudinary.uploader.explicit(uploadResult.public_id, {
      type: "upload",
      resource_type: "video",
      eager: [
        {
          transformation: [
            { width: scale, crop: "scale" },
            { video_codec: "h264" },
            { bitrate: "800k" }, // balanced quality
            { quality: "auto:good" }, // better balance
            { fetch_format: "mp4" },
          ],
        },
      ],
      eager_async: false,
    });

    const compressed = eagerResult?.eager?.[0];

    return NextResponse.json({
      ok: true,
      target,
      original: {
        url: uploadResult.secure_url,
        bytes: uploadResult.bytes,
      },
      compressed: {
        url: compressed?.secure_url,
        bytes: compressed?.bytes ?? null,
      },
    });
  } catch (e: any) {
    console.error("[video-upload] error:", e);
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 });
  }
}
