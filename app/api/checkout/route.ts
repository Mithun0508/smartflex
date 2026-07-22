import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { razorpay } from "@/lib/razorpay";
import { getOrCreateUser } from "@/lib/user";
import { checkoutLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 🔒 Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🛡️ Rate limit: 5 checkout attempts per hour per user
    const rateLimitResult = checkoutLimiter(userId);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { action } = body;

    // Strict action validation
    const validActions = ["subscribe", "buy_credits"];
    if (!action || !validActions.includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Sync user to DB
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress || `${userId}@usesmartflex.com`;
    await getOrCreateUser(userId, email);

    // Set amount based on action
    let amount = 0;
    let description = "";

    if (action === "subscribe") {
      amount = 49900; // ₹499 in paise
      description = "SmartFlex Pro Plan - Monthly Subscription";
    } else if (action === "buy_credits") {
      amount = 9900; // ₹99 in paise
      description = "SmartFlex 15 Premium Credits Pack";
    }

    // Create Razorpay Order
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${userId.slice(-8)}_${Date.now().toString().slice(-8)}`,
      notes: {
        userId,
        action,
        email,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      description,
      userEmail: email,
      userName: clerkUser?.firstName || "User",
      action,
    });

  } catch (error: any) {
    console.error("[Razorpay checkout error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
