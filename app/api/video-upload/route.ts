// app/api/video-upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const target = (form.get("target") as string) || "480p";

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    // Input cap (keep 200MB as requested)
    const MAX_INPUT_SIZE = 200 * 1024 * 1024;
    if (file.size > MAX_INPUT_SIZE) {
      return NextResponse.json(
        { error: "File too large for current plan (max 200MB)" },
        { status: 413 }
      );
    }

    // Save input to /tmp
    const buffer = Buffer.from(await file.arrayBuffer());
    const inputPath = path.join("/tmp", `sf-input-${Date.now()}.mp4`);
    const outputPath = path.join("/tmp", `sf-output-${Date.now()}.mp4`);
    fs.writeFileSync(inputPath, buffer);

    // Decide scale
    const scale = target === "1080p" ? "1080" : target === "720p" ? "720" : "480";

    // FFmpeg compression
    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-y",                    // overwrite output
        "-i", inputPath,         // input
        "-vf", `scale=-2:${scale}`, // keep aspect ratio, width divisible by 2
        "-c:v", "libx264",
        "-preset", "fast",       // speed/quality tradeoff
        "-b:v", "1000k",         // ~1 Mbps for 480p; adjust later for Pro tiers
        "-maxrate", "1200k",
        "-bufsize", "2000k",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart", // better streaming
        outputPath,
      ]);

      ffmpeg.on("error", (err) => reject(err));
      ffmpeg.stderr.on("data", (d) => {
        // Optional: log for debugging
        // console.log("[ffmpeg]", d.toString());
      });
      ffmpeg.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg failed with code ${code}`));
      });
    });

    // Read compressed output
    const compressedBuffer = fs.readFileSync(outputPath);

    // Upload compressed file to Cloudinary
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "smartflex/videos",
          // Optional: public_id prefix if you want predictable names
          // public_id: `sf-${Date.now()}`,
        },
        (
          err: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (err) reject(err);
          else if (result) resolve(result);
          else reject(new Error("Unknown Cloudinary error"));
        }
      );

      uploadStream.end(compressedBuffer);
    });

    // Cleanup temp files
    try {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    } catch {
      // ignore cleanup errors
    }

    return NextResponse.json({
      ok: true,
      target,
      original: {
        // We don’t upload original now—only compressed—so return local size
        bytes: file.size,
      },
      compressed: {
        url: uploadResult.secure_url,
        bytes: uploadResult.bytes,
      },
    });
  } catch (e: any) {
    console.error("[video-upload] error:", e);
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: e?.http_code || 500 }
    );
  }
}
