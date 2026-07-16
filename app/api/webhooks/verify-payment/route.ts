import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";
import prisma from "@/utils/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, action } = body;

    // 🔒 Verify payment signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Razorpay signature verification failed");
      return NextResponse.json({ ok: false, error: "Payment verification failed" }, { status: 400 });
    }

    // ✅ Signature verified — update database
    if (action === "subscribe") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          isPro: true,
          razorpayCustomerId: razorpay_payment_id,
        },
      });
      console.log(`✅ [Verify] User ${userId} upgraded to PRO`);

    } else if (action === "buy_credits") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: { increment: 15 },
        },
      });
      console.log(`✅ [Verify] Added 15 credits to user ${userId}`);
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error("❌ Payment verification error:", error);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
