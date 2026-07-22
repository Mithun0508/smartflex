import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { feedbackLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  try {
    // 🔒 Auth check
    const { userId } = await auth();
    const identifier = userId || req.headers.get("x-forwarded-for") || "anonymous";

    // 🛡️ Rate limit: 3 feedbacks per hour
    const rateLimitResult = feedbackLimiter(identifier);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body;

    // Input validation
    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Email and message are required." }, { status: 400 });
    }

    // Sanitize - limit lengths to prevent abuse
    const safeName    = String(name    || "Anonymous").slice(0, 100);
    const safeEmail   = String(email).slice(0, 254);
    const safeMessage = String(message).slice(0, 2000);

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      return NextResponse.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }

    const { getPrisma } = await import("@/lib/db");
    const prisma = getPrisma();

    await prisma.feedback.create({
      data: { name: safeName, email: safeEmail, message: safeMessage },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
