import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 🚫 Pro compression temporarily disabled
// ✅ Keeps build clean
// ✅ 480p flow remains untouched
// ✅ Honest SaaS behavior

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "Pro / Coming Soon (Under Optimization) 🚀",
    },
    { status: 403 }
  );
}
