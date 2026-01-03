import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getPrisma } from "@/lib/db";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export const maxDuration = 60;
export const maxBodySize = "20mb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { ok: false, error: "File missing" },
        { status: 400 }
      );
    }

    // 🔒 IMAGE FREE PLAN LIMIT
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "Free plan allows max 10MB image only" },
        { status: 413 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid file" },
        { status: 400 }
      );
    }

    // 2️⃣ Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3️⃣ Temp file
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "smartflex-"));
    const filePath = path.join(tempDir, file.name);
    await fs.writeFile(filePath, buffer);

    // 4️⃣ Cloudinary upload
    const uploadRes = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "smartflex/images",
    });

    // 5️⃣ Save to DB (optional, can skip if testing)
    // 5️⃣ Save to DB (dummy user for free mode)
    await getPrisma().image.create({
      data: {
        clerkUserId: "guest",   // ✅ add this line
        publicId: uploadRes.public_id,
        format: "social-adjust",
      },
    });


    // 6️⃣ Cleanup
    await fs.unlink(filePath);

    // 7️⃣ Response
    return NextResponse.json({
      ok: true,
      publicId: uploadRes.public_id,
      url: uploadRes.secure_url,
      width: uploadRes.width,
      height: uploadRes.height,
    });
  } catch (err: any) {
    console.error("Image upload error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Image upload failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "POST image file in multipart/form-data",
  });
}
