// app/api/subscription/toggle/route.ts
import { NextResponse } from "next/server"
import { togglePro } from "@/lib/store"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const enable = Boolean(body?.enable)
  togglePro(enable)
  return NextResponse.json({ ok: true, message: enable ? "Pro enabled" : "Pro disabled" })
}
