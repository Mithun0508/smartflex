import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050810] border-t border-[#1b2335] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg font-poppins mb-3">
              Smart<span className="text-[#16B6B0]">Flex</span>
            </h3>
            <p className="text-gray-400 text-sm font-inter leading-relaxed">
              AI-powered media compression for creators. Compress smarter, not harder.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/video-upload" className="hover:text-[#16B6B0] transition">Video Compression</Link></li>
              <li><Link href="/social-share" className="hover:text-[#16B6B0] transition">Social Media Resizer</Link></li>
              <li><Link href="/pricing" className="hover:text-[#16B6B0] transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[#16B6B0] transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#16B6B0] transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-[#16B6B0] transition">FAQ</Link></li>
              <li><Link href="/feedback" className="hover:text-[#16B6B0] transition">Feedback</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-[#16B6B0] transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#16B6B0] transition">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#16B6B0] transition">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1b2335] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-inter">
            © {currentYear} SmartFlex. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>Payments secured by <span className="text-white">Razorpay</span></span>
            <span>•</span>
            <span>Made with ❤️ in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
