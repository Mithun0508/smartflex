import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 🚧 Enterprise flow disabled for initial launch
// ✅ Prevents build-time execution
// ✅ Keeps SaaS honest
// ✅ Zero impact on Free / Video / Image features

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Enterprise plans are coming soon 🚀",
    },
    { status: 403 }
  );
}
