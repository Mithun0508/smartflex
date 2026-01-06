import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { runVideoJob } from "@/lib/videoWorker";

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

    const inputPath = path.join("/tmp", `sf-input-${Date.now()}.mp4`);
    const outputPath = path.join("/tmp", `sf-output-${Date.now()}.mp4`);

    fs.writeFileSync(inputPath, buffer);

    const scale =
      target === "1080p" ? "1080" : target === "720p" ? "720" : "480";

    // 🔥 BACKGROUND JOB (do not await)
    runVideoJob({ inputPath, outputPath, scale }).catch(console.error);

    // ⚡ respond immediately
    return NextResponse.json({
      ok: true,
      status: "processing",
      target,
    });
  } catch (e: any) {
    console.error("[video-upload]", e);
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
