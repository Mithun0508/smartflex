import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#070B14] border-t border-[#1b2335] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-white font-poppins mb-3">
              Smart<span className="text-[#16B6B0]">Flex</span>
            </h3>
            <p className="text-gray-400 text-sm font-inter leading-relaxed">
              Professional media compression and optimization for creators and businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-poppins">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-inter">
              <li><Link href="/video-upload" className="hover:text-[#16B6B0] transition">Video Compression</Link></li>
              <li><Link href="/social-share" className="hover:text-[#16B6B0] transition">Social Media Resizer</Link></li>
              <li><Link href="/pricing" className="hover:text-[#16B6B0] transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-poppins">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-inter">
              <li><Link href="/about" className="hover:text-[#16B6B0] transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#16B6B0] transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#16B6B0] transition">FAQ</Link></li>
              <li><Link href="/feedback" className="hover:text-[#16B6B0] transition">Feedback</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-poppins">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-inter">
              <li><Link href="/privacy-policy" className="hover:text-[#16B6B0] transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#16B6B0] transition">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#16B6B0] transition">Refund & Cancellation</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1b2335] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-inter">
            © {new Date().getFullYear()} SmartFlex. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 font-inter">
            <Link href="/privacy-policy" className="hover:text-[#16B6B0] transition">Privacy</Link>
            <Link href="/terms" className="hover:text-[#16B6B0] transition">Terms</Link>
            <Link href="/refund-policy" className="hover:text-[#16B6B0] transition">Refund Policy</Link>
            <a href="mailto:support@usesmartflex.com" className="hover:text-[#16B6B0] transition">support@usesmartflex.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
