import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SmartFlex",
  description: "Terms and Conditions for using SmartFlex media compression and optimization platform.",
};

export default function TermsPage() {
  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold font-poppins text-white mb-4">Terms & Conditions</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: July 2025</p>

        <div className="space-y-10 text-gray-300 font-inter leading-relaxed">

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-400">
              By accessing or using SmartFlex ("the Platform"), you agree to be bound by these Terms
              and Conditions. If you do not agree, please discontinue use of the platform immediately.
              These terms apply to all users, including free and paid subscribers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">2. Services Offered</h2>
            <p className="text-gray-400">SmartFlex provides the following services:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>Video compression and optimization</li>
              <li>Social media image resizing and adjustment</li>
              <li>Free plan with limited daily compressions</li>
              <li>Pro subscription with enhanced features and limits</li>
              <li>Pay-as-you-go credit packs for additional usage</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>You must be at least 18 years old to use paid services</li>
              <li>You are responsible for all content you upload</li>
              <li>You must not upload illegal, copyrighted, or harmful content</li>
              <li>You must not attempt to bypass usage limits or hack the platform</li>
              <li>You are responsible for keeping your account credentials secure</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">4. Prohibited Content</h2>
            <p className="text-gray-400">
              You may not upload or process content that is illegal, defamatory, obscene, pornographic,
              or that infringes on any third-party intellectual property rights. SmartFlex reserves the
              right to terminate accounts that violate this policy without notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">5. Payment & Subscription</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Pro subscriptions are billed monthly at ₹499/month</li>
              <li>Credit packs are one-time purchases and non-transferable</li>
              <li>All payments are processed securely via Razorpay</li>
              <li>Prices are subject to change with 30 days notice</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">6. Intellectual Property</h2>
            <p className="text-gray-400">
              SmartFlex retains all intellectual property rights to the platform, its design, algorithms,
              and technology. Users retain ownership of content they upload. SmartFlex claims no
              ownership over user-uploaded media files.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-400">
              SmartFlex is provided "as is" without warranties of any kind. We are not liable for any
              loss of data, business interruptions, or damages arising from use of the platform.
              Our maximum liability is limited to the amount paid in the last 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">8. Termination</h2>
            <p className="text-gray-400">
              We reserve the right to suspend or terminate your account at any time for violations of
              these terms. You may cancel your subscription at any time through your account settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">9. Governing Law</h2>
            <p className="text-gray-400">
              These terms are governed by the laws of India. Any disputes shall be resolved under
              the jurisdiction of courts in India.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">10. Contact</h2>
            <p className="text-gray-400">
              For any questions about these terms, contact us at:{" "}
              <a href="mailto:support@usesmartflex.com" className="text-[#16B6B0] hover:underline">
                support@usesmartflex.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
