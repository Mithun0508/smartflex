import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.feedback.create({
      data: { name, email, message },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
