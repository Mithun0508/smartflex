import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";
import { startOfDay } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    // 🔥 Check logged-in user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔥 Request body
    const body = await req.json();

    // 🔥 Daily upload limit check (Free Plan)
    const todayStart = startOfDay(new Date());

    const todayUploads = await prisma.video.count({
      where: {
        clerkUserId: userId,
        createdAt: {
          gte: todayStart,
        },
      },
    });

    // 🚫 Block if limit exceeded
    if (todayUploads >= 5) {
      return NextResponse.json(
        {
          error:
            "Daily upload limit reached (5 uploads/day for free plan)",
        },
        { status: 403 }
      );
    }

    // 🔥 Extract fields
    const {
      publicId,
      title,
      description,
      secureUrl,
      compressedUrl,
      duration,
      originalSize,
    } = body;

    // 🔥 Save video in database
    const video = await prisma.video.create({
      data: {
        clerkUserId: userId,
        publicId,
        title: title || "Untitled Video",
        description: description || "",
        secureUrl,
        compressedUrl,
        duration: duration ? parseFloat(duration) : null,
        originalSize: originalSize
          ? originalSize.toString()
          : null,
        status: "PROCESSING",
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