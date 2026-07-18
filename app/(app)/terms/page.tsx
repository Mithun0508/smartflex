export default function TermsPage() {
  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold font-poppins text-white mb-4">Terms & Conditions</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: July 2026</p>

        <div className="space-y-10 text-gray-300 font-inter leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using SmartFlex (usesmartflex.com), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">2. Services</h2>
            <p>SmartFlex provides AI-powered video compression and social media image resizing tools. Free users receive limited compressions per day. Pro users receive unlimited HD compressions and additional features.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts that violate these terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">4. Acceptable Use</h2>
            <p>You agree not to upload content that is illegal, harmful, or infringes on intellectual property rights. We reserve the right to remove any content and suspend accounts at our sole discretion.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">5. Payment Terms</h2>
            <p>All payments are processed securely via Razorpay. Subscription fees are billed monthly. By subscribing, you authorize us to charge your payment method on a recurring basis until you cancel.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">6. Limitation of Liability</h2>
            <p>SmartFlex shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. Our maximum liability is limited to the amount you paid in the last 30 days.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">7. Contact</h2>
            <p>For any questions regarding these terms, contact us at <a href="mailto:support@usesmartflex.com" className="text-[#16B6B0] hover:underline">support@usesmartflex.com</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
