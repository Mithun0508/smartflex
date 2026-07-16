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

    // Fetch User from database
    const userRecord = await prisma.user.findUnique({
      where: { id: userId },
    });

    const isPro = userRecord?.isPro || false;
    const credits = userRecord?.credits || 0;

    // Daily upload limit check (Only for Free Users)
    if (!isPro) {
      const todayStart = startOfDay(new Date());

      const todayUploads = await prisma.video.count({
        where: {
          clerkUserId: userId,
          createdAt: {
            gte: todayStart,
          },
        },
      });

      // Block if limit exceeded and user has no credits to consume
      if (todayUploads >= 5) {
        if (credits > 0) {
          // Consume 1 credit
          await prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: 1 } },
          });
          console.log(`[save-video] User ${userId} consumed 1 credit. Remaining: ${credits - 1}`);
        } else {
          return NextResponse.json(
            {
              error:
                "Daily upload limit reached (5 uploads/day for free plan). Please buy credits or upgrade to Pro.",
            },
            { status: 403 }
          );
        }
      }
    }
    console.log("🔥 TODAY UPLOAD COUNT (for free limits validation):", isPro ? "N/A (Pro)" : "Tracked");

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