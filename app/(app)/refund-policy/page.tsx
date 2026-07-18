export default function RefundPolicyPage() {
  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold font-poppins text-white mb-4">Refund & Cancellation Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: July 2026</p>

        <div className="space-y-10 text-gray-300 font-inter leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">1. Subscription Cancellation</h2>
            <p>You may cancel your Pro subscription at any time from your account settings. Upon cancellation, you will retain access to Pro features until the end of your current billing period. No further charges will be made after cancellation.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">2. Refund Eligibility</h2>
            <p>We offer a <strong className="text-white">7-day refund policy</strong> for new Pro subscriptions. If you are not satisfied with our service within 7 days of your first subscription payment, you may request a full refund by contacting our support team.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">3. Non-Refundable Cases</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Refund requests made after 7 days of payment</li>
              <li>Credits that have already been used</li>
              <li>Renewal charges (we send reminder emails before renewal)</li>
              <li>Accounts terminated for violating Terms of Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">4. Credit Pack Refunds</h2>
            <p>Credit packs (one-time purchases) are non-refundable once any credits have been used. Unused credit packs may be eligible for refund within 7 days of purchase.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">5. How to Request a Refund</h2>
            <p>To request a refund, please email us at <a href="mailto:support@usesmartflex.com" className="text-[#16B6B0] hover:underline">support@usesmartflex.com</a> with your registered email address and transaction details. We process refunds within <strong className="text-white">5-7 business days</strong>.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">6. Payment Disputes</h2>
            <p>Before raising a payment dispute with your bank, please contact us directly. We are committed to resolving all payment issues promptly and fairly. Chargebacks without prior contact may result in account suspension.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
