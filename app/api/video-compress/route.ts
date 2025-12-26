import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;



export async function POST(req: Request) {
  try {
    const { videoId } = await req.json();
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const compressedUrl = `https://res.cloudinary.com/${cloudName}/video/upload/br_500k,q_60,vc_h264/${video.publicId}.mp4`;

    const updated = await prisma.video.update({
      where: { id: videoId },
      data: { compressedUrl },
    });

    return NextResponse.json({ success: true, video: updated });
  } catch (err) {
    console.error("Compression error:", err);
    return NextResponse.json({ error: "Compression failed" }, { status: 500 });
  }
}
