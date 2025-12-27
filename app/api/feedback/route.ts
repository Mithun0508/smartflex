export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.feedback.create({
      data: { name, email, message },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
