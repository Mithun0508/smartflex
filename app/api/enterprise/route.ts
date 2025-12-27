import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 🛑 Build guard
 * Next.js calls this during build
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

    // ⚠️ Prisma must be INSIDE POST
    const { getPrisma } = await import("@/lib/db");
    const prisma = getPrisma();

    await prisma.enterpriseLead.create({
      data: { company, email, requirements },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enterprise error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
