import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getPrisma } from "@/lib/db";

function verify(body: string, signature: string) {
  const expected = crypto
    .createHmac("sha256", process.env.CLOUDINARY_API_SECRET!)
    .update(body)
    .digest("hex");

  return expected === signature;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-cld-signature");

  if (!signature || !verify(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);

  // Only when eager compression is DONE
  if (payload.resource_type === "video" && payload.eager?.length > 0) {
    const compressed = payload.eager[0];

    await getPrisma().video.updateMany({
      where: { publicId: payload.public_id },
      data: {
        compressedUrl: compressed.secure_url,
        compressedSize: compressed.bytes,
        duration: payload.duration,
        status: "COMPLETE",
      },
    });
  }

  return NextResponse.json({ ok: true });
}
