import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ✅ Build-safe GET
 * Next.js needs this during "collect page data"
 */
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const { company, email, requirements } = await req.json();

    if (!company || !email || !requirements) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const prisma = getPrisma();

    await prisma.enterpriseLead.create({
      data: {
        company,
        email,
        requirements,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enterprise API error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
