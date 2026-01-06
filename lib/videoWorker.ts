import { spawn } from "child_process";
import fs from "fs";
import cloudinary from "@/lib/cloudinary";

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";

export async function runVideoJob({
  inputPath,
  outputPath,
  scale,
}: {
  inputPath: string;
  outputPath: string;
  scale: string;
}) {
  return new Promise<void>((resolve, reject) => {
    const ffmpeg = spawn(FFMPEG, [
      "-y",
      "-i",
      inputPath,
      "-vf",
      `scale=-2:${scale}`,
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-b:v",
      "1000k",
      "-maxrate",
      "1200k",
      "-bufsize",
      "2000k",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      outputPath,
    ]);

    ffmpeg.on("error", reject);

    ffmpeg.on("close", async (code) => {
      if (code !== 0) return reject(new Error("FFmpeg failed"));

      await cloudinary.uploader.upload(outputPath, {
        resource_type: "video",
        folder: "smartflex/videos",
      });

      // cleanup
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);

      resolve();
    });
  });
}
