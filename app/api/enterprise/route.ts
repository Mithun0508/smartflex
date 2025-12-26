import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("ENTERPRISE BODY 👉", body);

    const { company, email, requirements } = body;

    if (!company || !email || !requirements) {
      return NextResponse.json(
        { ok: false, error: "Missing fields", body },
        { status: 400 }
      );
    }

    await prisma.enterpriseLead.create({
      data: { company, email, requirements },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ENTERPRISE ERROR ❌", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
