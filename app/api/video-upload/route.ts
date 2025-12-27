import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { spawn } from "child_process";
import { writeFile, readFile, unlink, mkdtemp } from "fs/promises";
import os from "os";
import path from "path";


export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

type Quality = "480p" | "720p" | "1080p";

// 🔥 Much higher quality — bitrate based + scaling
function scale(q: Quality) {
  switch (q) {
    case "1080p":
      return "scale=-2:1080";
    case "720p":
      return "scale=-2:720";
    default:
      return "scale=-2:480";
  }
}

// 🔥 Dynamic bitrate (keeps sharpness high)
function bitrate(q: Quality) {
  switch (q) {
    case "1080p":
      return "3500k"; // HD quality
    case "720p":
      return "2200k";
    default:
      return "1200k"; // 480p best quality
  }
}

async function writeTempFile(buffer: Buffer, ext: string) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "smartflex-"));
  const file = path.join(dir, `input.${ext}`);
  await writeFile(file, buffer);
  return file;
}

async function safeDel(p?: string) {
  if (!p) return;
  try {
    await unlink(p);
  } catch { }
}

export async function POST(req: NextRequest) {
  let inputPath = "";
  let outputPath = "";

  try {
    // parse form data

    const form = await req.formData();
    const file = form.get("file") as File | null;
    const quality = (form.get("quality") as Quality) || "480p";
    if (!file) {
      return NextResponse.json(
        { ok: false, error: "File missing" },
        { status: 400 }
      );
    }

    // 🔒 FREE PLAN LIMITS
    const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200 MB

    if (file.size > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        {
          ok: false,
          error: "Free plan limit: Max 200MB video allowed",
        },
        { status: 413 }
      );
    }

    // 🔒 PRO LOCKS
    if (quality === "720p") {
      return NextResponse.json(
        {
          ok: false,
          error: "720p is a Pro feature (Coming Soon 🚀)",
        },
        { status: 403 }
      );
    }
    if (quality === "1080p") {
      return NextResponse.json(
        {
          ok: false,
          error: "1080p is under optimization (Coming Soon 🚀) 🚀",
        },
        { status: 403 }
      );
    }


    if (!file) {
      return NextResponse.json({ ok: false, error: "File missing" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "mp4";

    // temp file
    inputPath = await writeTempFile(buffer, ext);
    outputPath = inputPath.replace(ext, `out.mp4`);

    // ============================
    // 🔥 IMPROVED HIGH-QUALITY FFMPEG
    // ============================
    await new Promise<void>((resolve, reject) => {
      const args = [
        "-y",
        "-i",
        inputPath,
        "-vf",
        scale(quality),
        "-c:v",
        "libx264",
        "-preset",
        "slow",              // Better compression quality
        "-b:v",
        bitrate(quality),    // Constant bitrate = stable quality
        "-maxrate",
        bitrate(quality),
        "-bufsize",
        "3000k",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-movflags",
        "+faststart",
        outputPath,
      ];

      const proc = spawn("ffmpeg", args);

      let stderr = "";
      proc.stderr.on("data", (d) => (stderr += d.toString()));

      proc.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(stderr));
      });
    });

    // read final file
    const compressedBuf = await readFile(outputPath);

    // upload to cloudinary
    const upload = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "smartflex/videos" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(compressedBuf);
    });

    return NextResponse.json(
      {
        ok: true,
        url: upload.secure_url,
        size: compressedBuf.byteLength,
        publicId: upload.public_id,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("VIDEO ERROR =>", e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  } finally {
    await safeDel(inputPath);
    await safeDel(outputPath);
  }
}
