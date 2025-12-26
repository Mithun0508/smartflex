// app/api/credits/buy/route.ts
import { NextResponse } from "next/server"
import { addCredit } from "@/lib/store"

export async function POST() {
  // Mock: pretend payment success and add one credit
  addCredit(1)
  return NextResponse.json({ ok: true, message: "1 credit added" })
}
