import Script from "next/script";

export const metadata = {
  title: "SmartFlex – Free Online AI Video Compressor & Image Resizer",
  description:
    "Free AI-powered tools to compress videos, resize social media images, and optimize media instantly.",
};

export default function HomePage() {
  return (
    <>
      {/* ========== SEO SCHEMA ========== */}
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SmartFlex",
            operatingSystem: "All",
            applicationCategory: "MultimediaApplication",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1284",
            },
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          }),
        }}
      />

      {/* ========== MAIN UI ========== */}
      <main className="bg-[#000000] text-white">

        {/* ===================== HERO ===================== */}
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">

            <h1 className="text-4xl md:text-6xl font-bold font-poppins leading-tight mb-6">
              Compress Smarter. <br />
              <span className="text-[#16B6B0]">Share Faster.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-inter">
              AI-powered media tools that help creators optimize, compress, and share content instantly.
            </p>

            <a
              href="/video-upload"
              className="inline-block bg-[#0B1B36] hover:bg-[#12284d] text-white px-8 py-3 rounded-xl font-poppins text-lg transition-transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </a>

            {/* Smart Toolbox */}
            <div className="mt-14 p-8 bg-[#0A0F1A] border border-[#1b2335] rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold font-poppins mb-4">Your Smart Toolbox</h3>
              <p className="text-gray-400 text-sm font-inter mb-6 max-w-xl mx-auto">
                Everything you need to prepare videos and images for social media, clients, or content creation.
              </p>

              <div className="grid md:grid-cols-3 gap-5">
                <div className="p-5 bg-[#0f1624] hover:bg-[#151d2d] border border-[#1b2335] rounded-xl transition cursor-pointer">
                  <span className="text-3xl">🎥</span>
                  <p className="font-semibold mt-2">Video Compressor</p>
                </div>

                <div className="p-5 bg-[#0f1624] hover:bg-[#151d2d] border border-[#1b2335] rounded-xl transition cursor-pointer">
                  <span className="text-3xl">🖼️</span>
                  <p className="font-semibold mt-2">Image Adjustment</p>
                </div>

                <div className="p-5 bg-[#0f1624] hover:bg-[#151d2d] border border-[#1b2335] rounded-xl transition cursor-pointer">
                  <span className="text-3xl">⚡</span>
                  <p className="font-semibold mt-2">Upcoming Tools</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== WHY SMARTFLEX ===================== */}
        <section className="py-20 bg-[#0A0F1A]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-12">
              Why SmartFlex?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">

              <a href="/video-upload" className="bg-[#0f1624] hover:-translate-y-1 border border-[#1b2335] rounded-xl p-8 shadow-lg transition-all block">
                <span className="text-5xl mb-4 block">📹</span>
                <h3 className="text-xl font-semibold font-poppins">Video Compression</h3>
                <p className="text-gray-400 text-sm mt-3 font-inter">
                  AI-optimized compression for instant sharing.
                </p>
              </a>

              <a href="/image-upload" className="bg-[#0f1624] hover:-translate-y-1 border border-[#1b2335] rounded-xl p-8 shadow-lg transition-all block">
                <span className="text-5xl mb-4 block">📷</span>
                <h3 className="text-xl font-semibold font-poppins">Image Adjustment</h3>
                <p className="text-gray-400 text-sm mt-3 font-inter">
                  Resize, enhance & optimize for any platform.
                </p>
              </a>

              <a href="/pricing" className="bg-[#0f1624] hover:-translate-y-1 border border-[#1b2335] rounded-xl p-8 shadow-lg transition-all block">
                <span className="text-5xl mb-4 block">🏅</span>
                <h3 className="text-xl font-semibold font-poppins">Fair Pricing</h3>
                <p className="text-gray-400 text-sm mt-3 font-inter">
                  Start free, upgrade when needed.
                </p>
              </a>

            </div>
          </div>
        </section>

        {/* ===================== TRUST SECTION ===================== */}
        <section className="py-16 bg-[#000000]">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <h2 className="text-2xl md:text-3xl font-bold mb-10 font-poppins">
              Trusted by creators worldwide
            </h2>

            <div className="flex flex-wrap justify-center gap-8">

              {[
                { name: "Aarav Gupta", role: "Tech Creator" },
                { name: "Sarah Creative", role: "Digital Artist" },
                { name: "ReelMaster Studio", role: "Content Agency" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0f1624] px-6 py-4 rounded-xl border border-[#1b2335] shadow-md hover:border-[#16B6B0] transition"
                >
                  <span className="text-lg font-semibold text-[#16B6B0]">{item.name}</span>
                  <p className="text-gray-400 text-xs">{item.role}</p>
                </div>
              ))}

            </div>

            <p className="mt-8 text-gray-400 max-w-xl mx-auto font-inter text-sm">
              “SmartFlex has simplified my workflow. I compress and optimize everything in seconds.”
            </p>

          </div>
        </section>

        {/* ===================== PRICING PREVIEW ===================== */}
        <section className="py-20 bg-[#0A0F1A]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-14">Choose Your Plan</h2>

            <div className="grid md:grid-cols-3 gap-10">

              <a href="/pricing" className="bg-[#0f1624] border-2 border-[#16B6B0] p-8 rounded-xl shadow-lg hover:-translate-y-1 block transition">
                <span className="text-5xl">🆓</span>
                <h3 className="text-xl font-semibold font-poppins mt-4">Free</h3>
                <p className="text-gray-400 text-sm mt-3 mb-6 font-inter">
                  480p compression, basic image tools.
                </p>
                <span className="bg-[#16B6B0] text-black px-6 py-2 rounded-lg font-poppins inline-block">
                  Start Now
                </span>
              </a>

              <a href="/pricing" className="bg-[#0f1624] border border-[#1b2335] p-8 rounded-xl shadow-lg hover:-translate-y-1 block transition">
                <span className="text-5xl">💼</span>
                <h3 className="text-xl font-semibold font-poppins mt-4">Pro</h3>
                <p className="text-gray-400 text-sm mt-3 mb-6 font-inter">
                  HD compression + advanced presets.
                </p>
                <span className="bg-[#0B1B36] text-white px-6 py-2 rounded-lg font-poppins inline-block">
                  Learn More
                </span>
              </a>

              <a href="/pricing" className="bg-[#0f1624] border border-[#1b2335] p-8 rounded-xl shadow-lg hover:-translate-y-1 block transition">
                <span className="text-5xl">🏢</span>
                <h3 className="text-xl font-semibold font-poppins mt-4">Enterprise</h3>
                <p className="text-gray-400 text-sm mt-3 mb-6 font-inter">
                  Custom AI solutions for teams.
                </p>
                <span className="border border-[#16B6B0] text-[#16B6B0] px-6 py-2 rounded-lg font-poppins inline-block">
                  Learn More
                </span>
              </a>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
