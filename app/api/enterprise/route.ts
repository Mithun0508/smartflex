export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company, email, requirements } = body;

    if (!email || !company) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.enterpriseLead.create({
      data: { company, email, requirements },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enterprise API error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
