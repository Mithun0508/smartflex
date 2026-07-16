import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 🔒 Clerk Auth Check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const enable = Boolean(body?.enable);

    // Update isPro status in Neon DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isPro: enable },
    });

    console.log(`[Dev Toggle] Set isPro to ${enable} for user ${userId}`);

    return NextResponse.json({
      ok: true,
      message: enable ? "Pro enabled (Dev Bypass)" : "Pro disabled (Dev Bypass)",
      isPro: updatedUser.isPro,
    });

  } catch (error: any) {
    console.error("[Dev Toggle Error]:", error);
    return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
  }
}
