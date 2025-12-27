import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 🔑 Required for Next.js build
 * Next build tries to pre-evaluate routes
 */
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const prisma = getPrisma();

    await prisma.feedback.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback API error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
