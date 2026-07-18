export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold font-poppins text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: July 2026</p>

        <div className="space-y-10 text-gray-300 font-inter leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as your name, email address, and payment information when you register for an account or make a purchase. We also collect usage data including videos and images you upload for processing.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">3. Data Storage & Security</h2>
            <p>Your files are processed via Cloudinary and are automatically deleted after 24 hours. We do not permanently store your uploaded media. Account data is stored securely in encrypted databases.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services: Clerk (authentication), Razorpay (payments), Cloudinary (media processing), and Neon (database). Each service has its own privacy policy governing the use of your information.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">5. Cookies</h2>
            <p>We use cookies to maintain your session and preferences. You can disable cookies through your browser settings, though this may affect the functionality of our services.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@usesmartflex.com" className="text-[#16B6B0] hover:underline">support@usesmartflex.com</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
