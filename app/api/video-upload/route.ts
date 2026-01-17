import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    // 🔐 Get Cloudinary credentials
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const apiKey = process.env.CLOUDINARY_API_KEY!;
    const apiSecret = process.env.CLOUDINARY_API_SECRET!;

    // ❗ Large video must use chunk upload + signed eager transformations
    const timestamp = Math.floor(Date.now() / 1000);

    const eager = "h_480,vc_h264,ac_aac"; // compression target

    const stringToSign = `eager=${eager}&folder=smartflex/videos&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

    // 🔄 Prepare chunk upload URL
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", apiKey);
    fd.append("timestamp", timestamp.toString());
    fd.append("signature", signature);
    fd.append("folder", "smartflex/videos");
    fd.append("eager", eager);
    fd.append("resource_type", "video");
    fd.append("chunk_size", (6 * 1024 * 1024).toString()); // 6 MB chunks

    // 🔥 Upload to Cloudinary
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      body: fd,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      publicId: data.public_id,
      originalUrl: data.secure_url,
      compressedUrl: data.eager?.[0]?.secure_url || null,
      status: "processing",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
