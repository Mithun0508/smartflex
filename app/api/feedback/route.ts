import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { getPrisma } = await import("@/lib/db");
    const prisma = getPrisma();

    await prisma.feedback.create({
      data: { name, email, message },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
