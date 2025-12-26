import Script from "next/script";

export default function FAQPage() {
  <Script
  id="faq-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the Free plan really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes. You can compress videos to 480p and adjust images with essential presets—no credit card required.",
          },
        },
        {
          "@type": "Question",
          name: "What do I get with Pro?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Pro includes HD compression, advanced presets, faster processing, and priority support.",
          },
        },
        {
          "@type": "Question",
          name: "Which formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Video: MP4, MOV, WEBM. Images: JPG, PNG, WebP.",
          },
        },
      ],
    }),
  }}
/>

  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-3xl mx-auto px-6">

        {/* HEADER */}
        <h1 className="text-4xl font-bold font-poppins text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 text-center mt-3 mb-12 font-inter">
          Clear answers to help you get the most out of SmartFlex.
        </p>

        {/* FAQ CARD */}
        <div className="bg-[#0F1624] border border-[#1b2335] rounded-2xl p-10 shadow-xl space-y-8">

          {/* ITEM 1 */}
          <div>
            <h2 className="text-lg font-semibold text-[#16B6B0] font-poppins">
              Is the Free plan really free?
            </h2>
            <p className="text-gray-300 text-sm mt-2 font-inter leading-relaxed">
              Yes. You can compress videos to 480p and adjust images with essential presets—
              no credit card required.
            </p>
          </div>

          {/* ITEM 2 */}
          <div>
            <h2 className="text-lg font-semibold text-[#16B6B0] font-poppins">
              What do I get with Pro?
            </h2>
            <p className="text-gray-300 text-sm mt-2 font-inter leading-relaxed">
              HD/FHD compression, advanced presets, faster processing, and priority support
              designed for creators.
            </p>
          </div>

          {/* ITEM 3 */}
          <div>
            <h2 className="text-lg font-semibold text-[#16B6B0] font-poppins">
              Which formats are supported?
            </h2>
            <p className="text-gray-300 text-sm mt-2 font-inter leading-relaxed">
              Video: MP4, MOV, WEBM. Images: JPG, PNG, WebP.  
              More formats are coming based on community feedback.
            </p>
          </div>

          {/* ITEM 4 */}
          <div>
            <h2 className="text-lg font-semibold text-[#16B6B0] font-poppins">
              Do you keep my files?
            </h2>
            <p className="text-gray-300 text-sm mt-2 font-inter leading-relaxed">
              Files are temporarily processed and not stored long-term.  
              See our Privacy & Terms for full details.
            </p>
          </div>

          {/* ITEM 5 */}
          <div>
            <h2 className="text-lg font-semibold text-[#16B6B0] font-poppins">
              Can teams use SmartFlex?
            </h2>
            <p className="text-gray-300 text-sm mt-2 font-inter leading-relaxed">
              Yes. Enterprise plans support multi-user teams, custom limits,  
              workflows, and priority assistance.
            </p>
          </div>

          {/* ITEM 6 */}
          <div>
            <h2 className="text-lg font-semibold text-[#16B6B0] font-poppins">
              How do I report issues or request features?
            </h2>
            <p className="text-gray-300 text-sm mt-2 font-inter leading-relaxed">
              Use the Feedback page to share bugs and ideas — we iterate fast  
              and prioritize creator needs.
            </p>
          </div>

        </div>

        {/* CTA BUTTONS */}
        <div className="text-center mt-12 flex flex-wrap justify-center gap-4">

          <a
            href="/pricing"
            className="px-6 py-2 rounded-xl border border-[#16B6B0] text-[#16B6B0] hover:bg-[#16B6B0] hover:text-black transition font-semibold font-poppins"
          >
            View Pricing
          </a>

          <a
            href="/feedback"
            className="px-6 py-2 rounded-xl border border-gray-500 text-gray-300 hover:bg-[#1b2335] transition font-semibold font-poppins"
          >
            Send Feedback
          </a>

          <a
            href="/contact"
            className="px-6 py-2 rounded-xl bg-[#16B6B0] text-black font-semibold hover:opacity-90 transition font-poppins"
          >
            Enterprise Contact
          </a>

        </div>

      </div>
    </section>
  );
}
