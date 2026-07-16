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

    // Increment user credits by 50 in Neon DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: 50 } },
    });

    console.log(`[Dev Buy] Added 50 credits to user ${userId}`);

    return NextResponse.json({
      ok: true,
      message: "50 credits added (Dev Bypass)",
      credits: updatedUser.credits,
    });

  } catch (error: any) {
    console.error("[Dev Buy Error]:", error);
    return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
  }
}
