import { NextRequest, NextResponse } from "next/server";
import { getCloudinary } from "@/lib/cloudinary";
import { getPrisma } from "@/lib/db";
import type {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

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

    // 🔒 Free plan image limit (10MB)
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
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

    // 2️⃣ Buffer (no temp files)
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3️⃣ Cloudinary (runtime-only)
    const cloudinary = getCloudinary();

    const uploadRes = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "smartflex/images",
          transformation: [
            { quality: "auto", fetch_format: "auto" },
          ],
        },
        (
          err: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (err || !result) {
            reject(err ?? new Error("Image upload failed"));
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    // 4️⃣ Save metadata (optional, safe)
    await getPrisma().image.create({
      data: {
        clerkUserId: "guest", // free user
        publicId: uploadRes.public_id,
        format: "social-adjust",
      },
    });

    // 5️⃣ Response
    return NextResponse.json({
      ok: true,
      publicId: uploadRes.public_id,
      url: uploadRes.secure_url,
      width: uploadRes.width,
      height: uploadRes.height,
    });
  } catch (err: any) {
    console.error("[image-upload]", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Image upload failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "POST image file as multipart/form-data",
  });
}