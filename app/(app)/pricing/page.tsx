import Script from "next/script";

export default function PricingPage() {
  <Script
    id="pricing-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "SmartFlex Pro",
        description: "AI-powered HD compression & image resizing tools.",
        brand: "SmartFlex",
        offers: {
          "@type": "Offer",
          url: "https://smartflex.vercel.app/pricing",
          priceCurrency: "INR",
          price: "499",
          availability: "https://schema.org/InStock",
        },
      }),
    }}
  />

  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins">
            SmartFlex Pricing
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto font-inter">
            Fair plans built for creators — start free, upgrade whenever you’re ready.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* FREE PLAN */}
          <div className="bg-[#0F1624] border border-[#1b2335] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
            <div className="text-center space-y-5">
              <span className="text-5xl">🆓</span>
              <h3 className="text-2xl font-semibold font-poppins">Free</h3>

              <p className="text-gray-400 text-sm font-inter">
                480p compression, basic image tools — forever free.
              </p>

              <p className="text-3xl font-bold text-[#16B6B0] mt-3">₹0</p>
              <p className="text-xs text-gray-500">per month</p>

              <a
                href="/video-upload"
                className="block mt-6 px-6 py-3 rounded-xl bg-[#16B6B0] text-black font-semibold hover:opacity-90 transition"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* PRO PLAN (HIGHLIGHTED) */}
          <div className="bg-[#122035] border border-[#16B6B0] p-10 rounded-2xl shadow-2xl scale-105 hover:scale-110 transition">
            <div className="text-center space-y-5">
              <span className="text-5xl">💼</span>
              <h3 className="text-2xl font-semibold font-poppins">Pro</h3>

              <p className="text-gray-300 text-sm font-inter">
                HD compression, advanced presets & faster processing.
              </p>

              <p className="text-4xl font-bold text-[#16B6B0] mt-3">₹499</p>
              <p className="text-xs text-gray-500">per month</p>
              <p className="text-sm text-yellow-400 font-inter">
                Pro features are under optimization and will be available soon.
              </p>


              <a
                href="/sign-up"
                className="block mt-6 px-6 py-3 rounded-xl bg-[#16B6B0] text-black font-semibold hover:opacity-90 transition"
              >
                Upgrade Now
              </a>
            </div>
          </div>

          {/* ENTERPRISE */}
          <div className="bg-[#0F1624] border border-[#1b2335] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
            <div className="text-center space-y-5">
              <span className="text-5xl">🏢</span>
              <h3 className="text-2xl font-semibold font-poppins">Enterprise</h3>

              <p className="text-gray-400 text-sm font-inter">
                Custom workflows, multi-user teams, advanced support.
              </p>

              <p className="text-3xl font-bold text-white mt-3">Contact Sales</p>

              <a
                href="/contact"
                className="block mt-6 px-6 py-3 rounded-xl border border-[#16B6B0] text-[#16B6B0] font-semibold hover:bg-[#16B6B0] hover:text-black transition"
              >
                Contact Us
              </a>
            </div>
          </div>

        </div>

        {/* FAQ SECTION */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold font-poppins text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">

            <div>
              <h3 className="text-lg font-semibold text-[#16B6B0]">Is the Free plan really free?</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Yes — you get unlimited 480p video compression & basic image tools at no cost.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#16B6B0]">What do I get with Pro?</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Pro unlocks HD compression, priority processing & advanced presets.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#16B6B0]">How does Enterprise work?</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Enterprise plans are built for teams. Custom workflows, API access & dedicated support.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
