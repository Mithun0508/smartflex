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

    const MAX_INPUT_SIZE = 200 * 1024 * 1024;
    if (file.size > MAX_INPUT_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 200MB)" },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 🎯 Resolution mapping
    const height =
      target === "1080p" ? 1080 :
      target === "720p"  ? 720  :
      480;

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "smartflex/videos",
          eager: [
            {
              height,
              crop: "scale",
              video_codec: "h264",
              bit_rate: height === 480 ? "1000k" : height === 720 ? "2500k" : "4500k",
              audio_codec: "aac",
              audio_frequency: 44100,
            },
          ],
          eager_async: true, // 🔥 Cloudinary handles async processing
        },
        (err, uploadResult) => {
          if (err) reject(err);
          else resolve(uploadResult);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      ok: true,
      target,
      publicId: result.public_id,
      originalUrl: result.secure_url,
      status: "processing", // transformation runs async
    });

  } catch (e: any) {
    console.error("[video-upload]", e);
    return NextResponse.json(
      { error: e?.message || "Compression failed" },
      { status: 500 }
    );
  }
}
