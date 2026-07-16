import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/utils/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 🔒 Verify Razorpay webhook signature
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.error("❌ Razorpay webhook signature mismatch");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    console.log(`[Razorpay Webhook] Event: ${eventType}`);

    if (eventType === "payment.captured") {
      const payment = event.payload.payment.entity;
      const notes = payment.notes || {};
      const userId = notes.userId;
      const action = notes.action;

      if (!userId) {
        console.warn("[Razorpay Webhook] No userId in payment notes");
        return NextResponse.json({ received: true });
      }

      if (action === "subscribe") {
        // ✅ Upgrade user to Pro
        await prisma.user.update({
          where: { id: userId },
          data: {
            isPro: true,
            razorpayCustomerId: payment.contact || null,
          },
        });
        console.log(`✅ User ${userId} upgraded to PRO`);

      } else if (action === "buy_credits") {
        // ✅ Add 15 credits to user
        await prisma.user.update({
          where: { id: userId },
          data: {
            credits: { increment: 15 },
          },
        });
        console.log(`✅ Added 15 credits to user ${userId}`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("❌ Razorpay Webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
