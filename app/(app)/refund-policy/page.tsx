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
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">2. No Refund Policy</h2>
            <p>All payments made to SmartFlex are <strong className="text-white">non-refundable</strong>. Since SmartFlex provides digital services that are instantly accessible upon payment, we do not offer refunds on any subscription plans or credit pack purchases once the payment has been processed.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">3. Non-Refundable Items</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Monthly or annual Pro subscription fees</li>
              <li>One-time credit pack purchases</li>
              <li>Renewal charges</li>
              <li>Partially used subscription periods</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">4. Exceptions</h2>
            <p>Refunds will only be considered in cases of <strong className="text-white">duplicate payments</strong> or <strong className="text-white">technical errors</strong> caused by SmartFlex that resulted in an incorrect charge. Such claims must be reported within 48 hours of the transaction to <a href="mailto:mithunp36@gmail.com" className="text-[#16B6B0] hover:underline">mithunp36@gmail.com</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">5. Payment Disputes</h2>
            <p>Before raising a payment dispute or chargeback with your bank, please contact us at <a href="mailto:mithunp36@gmail.com" className="text-[#16B6B0] hover:underline">mithunp36@gmail.com</a>. Chargebacks filed without prior communication may result in immediate account suspension.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">6. Contact Us</h2>
            <p>For billing-related queries, reach us at <a href="mailto:mithunp36@gmail.com" className="text-[#16B6B0] hover:underline">mithunp36@gmail.com</a>. We aim to respond within 2 business days.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
