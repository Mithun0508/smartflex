import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SmartFlex",
  description: "Privacy Policy for SmartFlex - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold font-poppins text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: July 2025</p>

        <div className="space-y-10 text-gray-300 font-inter leading-relaxed">

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">1. Information We Collect</h2>
            <p>When you use SmartFlex, we collect the following information:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>Account information (name, email address) via Clerk authentication</li>
              <li>Uploaded media files (videos and images) for processing purposes</li>
              <li>Payment information processed securely via Razorpay</li>
              <li>Usage data such as number of compressions and tool usage</li>
              <li>Device and browser information for security purposes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>To provide and improve our media compression and resizing services</li>
              <li>To process payments and manage your subscription</li>
              <li>To send important account and service-related notifications</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To prevent fraud and ensure platform security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">3. Data Storage & Security</h2>
            <p className="text-gray-400">
              Your data is stored securely using industry-standard encryption. Uploaded media files
              are stored on Cloudinary's secure cloud servers. Account and payment data are stored in
              encrypted databases. We do not sell or share your personal information with third parties
              except as required to provide our services (Cloudinary, Razorpay, Clerk).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">4. Cookies</h2>
            <p className="text-gray-400">
              We use essential cookies for authentication and session management. These cookies are
              necessary for the platform to function properly. We do not use advertising or tracking cookies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to request deletion of your account and data</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">6. Media File Retention</h2>
            <p className="text-gray-400">
              Uploaded and compressed media files are stored temporarily for download purposes.
              Files may be automatically deleted after 30 days. We recommend downloading your
              processed files promptly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16B6B0] mb-3">7. Contact Us</h2>
            <p className="text-gray-400">
              For any privacy-related concerns, please contact us at:{" "}
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
