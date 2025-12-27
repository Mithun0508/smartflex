import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.email || !body?.message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await prisma.feedback.create({
      data: {
        name: body.name ?? null,
        email: body.email,
        message: body.message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("FEEDBACK ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
