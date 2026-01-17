import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { publicId, compressedUrl, compressedSize, duration } = body;

    await getPrisma().video.updateMany({
      where: { publicId },
      data: {
        compressedUrl,
        compressedSize,
        duration,
        status: "COMPLETE",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
