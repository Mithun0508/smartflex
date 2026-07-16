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
    // 🔒 Check Clerk Authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 1. Get quality preference from request body
    const body = await req.json().catch(() => ({}));
    const quality = body.quality || "480p";

    // 2. Fetch User Details & Sync with DB
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress || `${userId}@usesmartflex.com`;
    const userRecord = await getOrCreateUser(userId, email);

    // 3. Quota & Limits Checks
    const todayStart = startOfDay(new Date());
    const todayUploads = await prisma.video.count({
      where: {
        clerkUserId: userId,
        createdAt: { gte: todayStart },
      },
    });

    // Check Daily Limit for Free User (max 5 uploads)
    if (!userRecord.isPro && todayUploads >= 5 && userRecord.credits <= 0) {
      return NextResponse.json(
        { error: "Daily limit reached (5 compressions/day). Please upgrade to Pro or buy credits." },
        { status: 403 }
      );
    }

    // Check if Pro Quality is chosen without Pro tier/credits
    if (quality === "720p" && !userRecord.isPro && userRecord.credits <= 0) {
      return NextResponse.json(
        { error: "720p compression requires a Pro Subscription or 1 Credit." },
        { status: 403 }
      );
    }

    // 4. Set Cloudinary Eager Compression params
    let eager = "";
    if (quality === "720p") {
      eager = "q_auto:eco,vc_h264,br_800k,w_1280,h_720"; // 720p (Pro - No Watermark)
    } else {
      // 480p (Free - Watermarked with smartflex.com overlay)
      eager = "q_auto:low,vc_h264,br_500k,w_854,h_480,l_text:Arial_20_bold:smartflex.com,g_south_east,x_15,y_15,o_60";
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "smartflex/videos";
    const notificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://usesmartflex.com"}/api/cloudinary-webhook`;

    // Compile parameters to sign (must match alphabetical order for Cloudinary API)
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
    });

  } catch (error: any) {
    console.error("[video-upload signature error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}