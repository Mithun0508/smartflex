export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[#0f1624] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h3 className="font-poppins text-lg mb-3 text-white">SmartFlex</h3>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            AI-powered media tools for creators. Compress, optimize, and share faster.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-poppins text-md text-white mb-3">Product</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/video-upload" className="hover:text-[#16B6B0]">Video Compression</a></li>
            <li><a href="/image-upload" className="hover:text-[#16B6B0]">Image Adjustment</a></li>
            <li><a href="/pricing" className="hover:text-[#16B6B0]">Pricing</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-poppins text-md text-white mb-3">Company</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/about" className="hover:text-[#16B6B0]">About</a></li>
            <li><a href="/feedback" className="hover:text-[#16B6B0]">Feedback</a></li>
            <li><a href="/faq" className="hover:text-[#16B6B0]">FAQ</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} SmartFlex. All rights reserved.
      </div>
    </footer>
  );
}
