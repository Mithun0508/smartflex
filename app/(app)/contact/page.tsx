"use client";
import { useState } from "react";

export default function EnterprisePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const res = await fetch("/api/enterprise", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    company: formData.get("company"),
    email: formData.get("email"),
    requirements: formData.get("requirements"),
  }),
});


    if (res.ok) setSubmitted(true);
  };


  return (
    <section className="py-24 bg-[#070B14] text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            SmartFlex for <span className="text-[#16B6B0]">Enterprise</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-inter text-lg">
            Custom compression pipelines, team access, SLA-backed reliability, and
            dedicated support — built for scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-start">

          {/* LEFT: Trust + Value */}
          <div className="space-y-10">

            {/* Value points */}
            <div className="space-y-6">
              {[
                {
                  title: "Enterprise-grade performance",
                  desc: "High-volume video & image processing with predictable performance.",
                },
                {
                  title: "Security & compliance",
                  desc: "GDPR-ready workflows, secure file handling, and data isolation.",
                },
                {
                  title: "Team & workflow support",
                  desc: "Multiple users, role-based access, and custom limits.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-[#16B6B0] text-xl">✔</span>
                  <div>
                    <h3 className="font-semibold font-poppins">{item.title}</h3>
                    <p className="text-gray-400 text-sm font-inter">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {["GDPR Compliant", "99.9% SLA", "Secure Processing"].map((badge) => (
                <div
                  key={badge}
                  className="px-4 py-2 border border-[#1b2335] rounded-lg text-sm text-gray-300 bg-[#0A0F1A]"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="bg-[#0A0F1A] border border-[#1b2335] rounded-2xl shadow-xl p-8">

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">

                <h2 className="text-2xl font-semibold font-poppins mb-2">
                  Contact Sales
                </h2>
                <p className="text-sm text-gray-400 font-inter mb-6">
                  Tell us about your requirements — we’ll respond within 24 hours.
                </p>

                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Company name
                  </label>
                  <input
                    name="company"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#070B14] border border-[#1b2335] focus:border-[#16B6B0] focus:outline-none"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Work email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#070B14] border border-[#1b2335] focus:border-[#16B6B0] focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <textarea
                    name="requirements"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#070B14] border border-[#1b2335] focus:border-[#16B6B0] focus:outline-none"
                    placeholder="Describe scale, formats, usage, or integrations…"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#16B6B0] text-black font-semibold font-poppins hover:opacity-90 transition"
                >
                  Contact Sales
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <span className="text-4xl block mb-4">✅</span>
                <h3 className="text-xl font-semibold mb-2">
                  Request received
                </h3>
                <p className="text-gray-400 text-sm">
                  Our enterprise team will reach out shortly.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
