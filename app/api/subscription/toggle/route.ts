import { NextResponse } from "next/server";

// ⛔ This dev-only endpoint has been disabled in production.
// Pro status is only granted via verified Razorpay payments.
// See: /api/webhooks/verify-payment

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint is disabled." },
    { status: 410 } // 410 Gone
  );
}
