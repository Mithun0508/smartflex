import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | SmartFlex",
  description: "SmartFlex Refund and Cancellation Policy - Understand our refund process for subscriptions and credit packs.",
};

export default function RefundPolicyPage() {
  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold font-poppins text-white mb-4">Refund & Cancellation Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: July 2025</p>

        <div className="space-y-10 text-gray-300 font-inter leading-relaxed">

          <div className="bg-[#0F1624] border border-[#16B6B0]/20 rounded-xl p-6">
            <p className="text-gray-300">
              At SmartFlex, we want you to be completely satisfied with our service. Please read
              our refund and cancellation policy carefully before making a purchase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">1. Pro Subscription — Cancellation</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>You can cancel your Pro subscription at any time from your account settings</li>
              <li>After cancellation, you will retain Pro access until the end of the current billing period</li>
              <li>No further charges will be made after cancellation</li>
              <li>Cancellation takes effect immediately and cannot be undone</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">2. Pro Subscription — Refund</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Refund requests made within <strong className="text-white">7 days</strong> of purchase will be considered</li>
              <li>Refunds are only applicable if the service was not used during this period</li>
              <li>If you have used more than 5 compressions after purchase, the refund will be denied</li>
              <li>Approved refunds will be processed within 5-7 business days to the original payment method</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">3. Credit Packs — Policy</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Credit pack purchases are <strong className="text-white">non-refundable</strong> once purchased</li>
              <li>Credits never expire and can be used at any time</li>
              <li>Credits are non-transferable between accounts</li>
              <li>In case of technical failure during credit usage, credits will be restored</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">4. Technical Issues</h2>
            <p className="text-gray-400">
              If you experience a technical issue where:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>A credit was deducted but the compression failed</li>
              <li>Payment was charged but Pro status was not activated</li>
              <li>Service was unavailable for more than 24 hours</li>
            </ul>
            <p className="mt-3 text-gray-400">
              Please contact us immediately at{" "}
              <a href="mailto:support@usesmartflex.com" className="text-[#16B6B0] hover:underline">
                support@usesmartflex.com
              </a>{" "}
              and we will resolve the issue or issue a full refund.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">5. How to Request a Refund</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>Email us at <a href="mailto:support@usesmartflex.com" className="text-[#16B6B0] hover:underline">support@usesmartflex.com</a></li>
              <li>Include your registered email address and order/payment ID</li>
              <li>Describe the reason for your refund request</li>
              <li>We will respond within 2 business days</li>
              <li>Approved refunds are processed within 5-7 business days</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">6. Non-Refundable Cases</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Refund requests made after 7 days of purchase</li>
              <li>Accounts terminated due to violation of Terms & Conditions</li>
              <li>Credit packs (non-refundable in all cases)</li>
              <li>Partially used subscription periods</li>
            </ul>
          </div>

          <div className="bg-[#0F1624] border border-[#1b2335] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-2">Need Help?</h2>
            <p className="text-gray-400">
              Our support team is here to help. Contact us at{" "}
              <a href="mailto:support@usesmartflex.com" className="text-[#16B6B0] hover:underline">
                support@usesmartflex.com
              </a>{" "}
              or visit our{" "}
              <a href="/contact" className="text-[#16B6B0] hover:underline">
                Contact page
              </a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
