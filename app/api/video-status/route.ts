import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const publicId = req.nextUrl.searchParams.get("publicId");
    if (!publicId) {
      return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
    }

    const video = await getPrisma().video.findFirst({
      where: { publicId },
    });

    if (!video) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
