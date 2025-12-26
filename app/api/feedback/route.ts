import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await prisma.feedback.create({
      data: {
        name: name || null,
        email,
        message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("FEEDBACK API ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
