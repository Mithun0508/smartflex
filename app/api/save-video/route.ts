import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma"; // Ya jo bhi aapka prisma path hai

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      publicId, 
      title, 
      description, 
      secureUrl, 
      compressedUrl, 
      duration, 
      originalSize 
    } = body;

    // Database mein entry create karna
    const video = await prisma.video.create({
      data: {
        clerkUserId: userId,
        publicId,
        title: title || "Untitled Video",
        description: description || "",
        secureUrl,
        compressedUrl,
        duration: duration ? parseFloat(duration) : null,
        originalSize: originalSize ? originalSize.toString() : null,
        status: "PROCESSING", // Shuruat mein status processing rahega
      },
    });

    return NextResponse.json(video);

  } catch (error: any) {
    console.error("Error saving video details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}