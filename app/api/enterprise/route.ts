import { NextResponse } from "next/server";
import { getPrisma} from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company, email, requirements } = body;

    if (!company || !email || !requirements) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await getPrisma().enterpriseLead.create({
      data: {
        company,
        email,
        requirements,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enterprise API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
