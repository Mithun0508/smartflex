import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/user";
import prisma from "@/utils/prisma";
import { startOfDay } from "date-fns";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // 🔒 Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const requestedQuality = body.quality || "480p";

    // Get user from DB
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress || `${userId}@usesmartflex.com`;
    const userRecord = await getOrCreateUser(userId, email);

    const isPro = userRecord.isPro;
    const credits = userRecord.credits;

    // ─── Daily Limit Check (Free users only) ───
    if (!isPro) {
      const todayStart = startOfDay(new Date());
      const todayUploads = await prisma.video.count({
        where: {
          clerkUserId: userId,
          createdAt: { gte: todayStart },
        },
      });

      // Free users get 5 free compressions per day
      if (todayUploads >= 5 && credits <= 0) {
        return NextResponse.json(
          { error: "Daily limit reached (5 compressions/day). Please upgrade to Pro or buy credits." },
          { status: 403 }
        );
      }
    }

    // ─── Quality Check & Credit Deduction ───
    let quality = requestedQuality;

    if (quality === "720p") {
      if (isPro) {
        // ✅ Pro user - allow 720p for free
      } else if (credits > 0) {
        // ✅ Has credits - allow 720p, deduct 1 credit
        await prisma.user.update({
          where: { id: userId },
          data: { credits: { decrement: 1 } },
        });
        console.log(`[video-upload] User ${userId} used 1 credit for 720p. Remaining: ${credits - 1}`);
      } else {
        // ❌ Free user, no credits - force 480p
        quality = "480p";
        console.log(`[video-upload] User ${userId} has no credits, downgraded to 480p`);
      }
    }

    // ─── Set Cloudinary Params based on final quality ───
    let eager = "";
    if (quality === "720p") {
      // Pro: 720p, no watermark, high quality
      eager = "q_auto:eco,vc_h264,br_800k,w_1280,h_720,c_scale";
    } else {
      // Free: 480p, watermark, lower quality
      eager = "q_auto:low,vc_h264,br_500k,w_854,h_480,c_scale,l_text:Arial_20_bold:smartflex.com,g_south_east,x_15,y_15,o_60";
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "smartflex/videos";
    const notificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://usesmartflex.com"}/api/cloudinary-webhook`;

    const paramsToSign = {
      eager,
      eager_async: "true",
      eager_notification_url: notificationUrl,
      folder,
      timestamp,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      eager,
      eagerAsync: "true",
      eagerNotificationUrl: notificationUrl,
      folder,
      finalQuality: quality, // Frontend ko batao actual quality kya use hui
    });

  } catch (error: any) {
    console.error("[video-upload error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}