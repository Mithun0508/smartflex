import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ isPro: false, credits: 0 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPro: true, credits: true },
    });

    return NextResponse.json({
      isPro: user?.isPro || false,
      credits: user?.credits || 0,
    });
  } catch {
    return NextResponse.json({ isPro: false, credits: 0 });
  }
}
