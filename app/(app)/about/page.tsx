"use client";
export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-3xl mx-auto px-6">

        {/* HEADER */}
        <h1 className="text-4xl font-bold font-poppins text-center">
          About SmartFlex
        </h1>
        <p className="text-gray-400 text-center mt-3 mb-12 font-inter">
          Compress smarter, share faster. Adjust once, share everywhere.
        </p>

        {/* MAIN CARD */}
        <div className="bg-[#0F1624] border border-[#1b2335] p-10 rounded-2xl shadow-xl space-y-10">

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-semibold font-poppins mb-2 text-[#16B6B0]">
              Our Mission
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-inter">
              We help creators and teams share media effortlessly—with fast video compression and 
              social-ready image adjustment in a clean, trustworthy platform.
            </p>
          </div>

          {/* What we’re building */}
          <div>
            <h2 className="text-2xl font-semibold font-poppins mb-2 text-[#16B6B0]">
              What We’re Building
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-inter">
              A polished platform that offers a useful free tier, backed by Pro tools for those who 
              need speed, presets, and reliability at scale.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-semibold font-poppins mb-2 text-[#16B6B0]">
              Our Values
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300 font-inter">
              <li>
                <span className="font-medium text-white">Trust:</span> Simple UI, clear limits, no surprises.
              </li>
              <li>
                <span className="font-medium text-white">Performance:</span> Fast results with consistent quality.
              </li>
              <li>
                <span className="font-medium text-white">Accessibility:</span> Mobile-first experience for everyone.
              </li>
            </ul>
          </div>

          {/* Features Icons */}
          <div className="grid gap-6 md:grid-cols-3 pt-4">
            <div className="bg-[#05070D] border border-[#1b2335] rounded-xl p-5 text-center">
              <span className="text-3xl">⚡</span>
              <p className="text-gray-300 text-sm mt-3">Fast Compression</p>
            </div>
            <div className="bg-[#05070D] border border-[#1b2335] rounded-xl p-5 text-center">
              <span className="text-3xl">🎯</span>
              <p className="text-gray-300 text-sm mt-3">Social Presets</p>
            </div>
            <div className="bg-[#05070D] border border-[#1b2335] rounded-xl p-5 text-center">
              <span className="text-3xl">🔒</span>
              <p className="text-gray-300 text-sm mt-3">Reliable & Fair</p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/video-upload"
            className="inline-block px-8 py-3 rounded-xl bg-[#16B6B0] text-black font-semibold hover:opacity-90 transition font-poppins"
          >
            Start Compressing
          </a>
        </div>

      </div>
    </section>
  );
}
