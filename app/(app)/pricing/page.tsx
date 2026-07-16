"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (action: "subscribe" | "buy_credits") => {
    if (!isSignedIn) {
      window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`;
      return;
    }

    setLoading(action);

    try {
      // Step 1: Create Razorpay order from our backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      // Step 2: Open Razorpay popup
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "SmartFlex",
        description: data.description,
        order_id: data.orderId,
        prefill: {
          email: data.userEmail,
          name: data.userName,
        },
        theme: {
          color: "#16B6B0",
        },
        modal: {
          ondismiss: () => {
            setLoading(null);
          },
        },
        handler: async (response: any) => {
          // Step 3: Payment successful - verify on backend
          try {
            const verifyRes = await fetch("/api/webhooks/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                action,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.ok) {
              alert(
                action === "subscribe"
                  ? "🎉 Congratulations! You are now a Pro member! Redirecting to dashboard..."
                  : "🎉 15 Credits added to your account! Redirecting..."
              );
              window.location.href = "/dashboard?payment=success";
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            alert("Payment done but verification failed. Please contact support.");
          } finally {
            setLoading(null);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.error("[Checkout Error]:", err);
      alert(err.message || "Failed to start checkout. Please try again.");
      setLoading(null);
    }
  };

  return (
    <>
      {/* Load Razorpay SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className="py-20 bg-[#070B14] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins">
              SmartFlex Pricing
            </h1>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto font-inter">
              Fair plans built for creators — start free, upgrade whenever you're ready.
            </p>
          </div>

          {/* PRICING GRID */}
          <div className="grid md:grid-cols-3 gap-10">

            {/* FREE PLAN */}
            <div className="bg-[#0F1624] border border-[#1b2335] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col justify-between">
              <div className="text-center space-y-5">
                <span className="text-5xl">🆓</span>
                <h3 className="text-2xl font-semibold font-poppins">Free</h3>
                <p className="text-gray-400 text-sm font-inter">
                  480p video compression & basic image resizing tools.
                </p>
                <p className="text-3xl font-bold text-[#16B6B0] mt-3">₹0</p>
                <p className="text-xs text-gray-500">5 compressions per day</p>
              </div>
              <a
                href="/video-upload"
                className="block mt-8 text-center px-6 py-3 rounded-xl bg-[#0B1B36] text-white font-semibold hover:bg-[#12284d] transition"
              >
                Get Started Free
              </a>
            </div>

            {/* PRO PLAN (HIGHLIGHTED) */}
            <div className="bg-[#122035] border border-[#16B6B0] p-8 rounded-2xl shadow-2xl scale-105 hover:scale-110 transition flex flex-col justify-between">
              <div className="text-center space-y-5">
                <span className="inline-block px-3 py-1 text-xs bg-[#16B6B0] text-black rounded-full font-bold mb-2">MOST POPULAR</span>
                <span className="text-5xl block">💼</span>
                <h3 className="text-2xl font-semibold font-poppins">Pro Plan</h3>
                <p className="text-gray-300 text-sm font-inter">
                  HD compression, priority fast queue, no watermarks, ad-free experience.
                </p>
                <p className="text-4xl font-bold text-[#16B6B0] mt-3">₹499</p>
                <p className="text-xs text-gray-400">per month (cancel anytime)</p>
              </div>
              <button
                id="upgrade-pro-btn"
                onClick={() => handleCheckout("subscribe")}
                disabled={loading === "subscribe"}
                className="w-full mt-8 px-6 py-3 rounded-xl bg-[#16B6B0] text-black font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading === "subscribe" ? "Opening payment..." : "Upgrade Now — ₹499/mo"}
              </button>
            </div>

            {/* ENTERPRISE */}
            <div className="bg-[#0F1624] border border-[#1b2335] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col justify-between">
              <div className="text-center space-y-5">
                <span className="text-5xl">🏢</span>
                <h3 className="text-2xl font-semibold font-poppins">Enterprise</h3>
                <p className="text-gray-400 text-sm font-inter">
                  Custom GPU pipelines, multi-user teams, dedicated support.
                </p>
                <p className="text-3xl font-bold text-white mt-3">Custom</p>
                <p className="text-xs text-gray-500">Contact our sales team</p>
              </div>
              <a
                href="/contact"
                className="block mt-8 text-center px-6 py-3 rounded-xl border border-[#16B6B0] text-[#16B6B0] font-semibold hover:bg-[#16B6B0] hover:text-black transition"
              >
                Contact Sales
              </a>
            </div>

          </div>

          {/* CREDIT PACK SECTION */}
          <div className="mt-20 p-8 bg-[#0A0F1A] border border-[#1b2335] rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <span className="bg-[#16B6B0]/10 text-[#16B6B0] text-xs px-3 py-1 rounded-full font-semibold">
                PAY AS YOU GO
              </span>
              <h3 className="text-xl font-bold font-poppins">Need more compressions without a subscription?</h3>
              <p className="text-gray-400 text-sm font-inter max-w-xl">
                Get <strong>15 Premium Credits</strong> for just ₹99. Each credit = 1 HD compression. Credits never expire.
              </p>
            </div>
            <div className="text-center md:text-right shrink-0">
              <p className="text-2xl font-bold text-white font-poppins">₹99</p>
              <p className="text-xs text-gray-500 mb-4">one-time · 15 credits</p>
              <button
                id="buy-credits-btn"
                onClick={() => handleCheckout("buy_credits")}
                disabled={loading === "buy_credits"}
                className="px-6 py-3 rounded-xl bg-[#0B1B36] hover:bg-[#12284d] text-white font-semibold transition disabled:opacity-50 border border-[#1b2335]"
              >
                {loading === "buy_credits" ? "Opening payment..." : "Buy 15 Credits — ₹99"}
              </button>
            </div>
          </div>

          {/* DEVELOPER BYPASS TOOLBAR (Only shown in Local Development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-16 p-8 border-2 border-dashed border-[#16B6B0]/40 bg-[#0A0F1A] rounded-2xl max-w-4xl mx-auto space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-[#16B6B0]">
                <span className="text-xl">🛠️</span>
                <h3 className="text-lg font-bold font-poppins">Developer Testing Toolbar</h3>
              </div>
              <p className="text-gray-400 text-xs font-inter">
                Visible only on <strong>localhost</strong> — test Pro/credits without real payments.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={async () => {
                    const res = await fetch("/api/subscription/toggle", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ enable: true }),
                    });
                    const data = await res.json();
                    if (res.ok) { alert("✅ Pro enabled! Reloading..."); window.location.reload(); }
                    else alert(data.error || "Failed");
                  }}
                  className="px-4 py-2.5 bg-[#16B6B0] text-black text-xs font-bold rounded-lg hover:opacity-90 transition"
                >
                  Dev: Enable Pro Status
                </button>
                <button
                  onClick={async () => {
                    const res = await fetch("/api/subscription/toggle", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ enable: false }),
                    });
                    const data = await res.json();
                    if (res.ok) { alert("✅ Pro disabled! Reloading..."); window.location.reload(); }
                    else alert(data.error || "Failed");
                  }}
                  className="px-4 py-2.5 border border-gray-600 text-gray-300 text-xs font-bold rounded-lg hover:bg-gray-800 transition"
                >
                  Dev: Disable Pro Status
                </button>
                <button
                  onClick={async () => {
                    const res = await fetch("/api/credits/buy", { method: "POST" });
                    const data = await res.json();
                    if (res.ok) { alert("✅ 50 Credits added! Reloading..."); window.location.reload(); }
                    else alert(data.error || "Failed");
                  }}
                  className="px-4 py-2.5 bg-[#0B1B36] text-white text-xs font-bold rounded-lg hover:bg-[#12284d] transition border border-[#1b2335]"
                >
                  Dev: Add 50 Credits
                </button>
              </div>
            </div>
          )}

          {/* FAQ SECTION */}
          <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-3xl font-bold font-poppins text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#16B6B0]">Is the Free plan really free?</h3>
                <p className="text-gray-400 mt-2 text-sm font-inter">
                  Yes — 480p video compression up to 5 times/day at no cost. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#16B6B0]">What payment methods are accepted?</h3>
                <p className="text-gray-400 mt-2 text-sm font-inter">
                  We accept UPI, Credit/Debit Cards, Net Banking, and all major Indian wallets via Razorpay.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#16B6B0]">How do credits work?</h3>
                <p className="text-gray-400 mt-2 text-sm font-inter">
                  Each credit = 1 HD video compression. Credits never expire and can be used anytime.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#16B6B0]">What do I get with Pro?</h3>
                <p className="text-gray-400 mt-2 text-sm font-inter">
                  HD (720p) compressions, no watermark, ad-free experience, and priority processing queue.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
