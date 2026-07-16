"use client";

import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

interface DashboardClientProps {
  isPro: boolean;
  credits: number;
  videosCount: number;
  imagesCount: number;
}

export default function DashboardClient({
  isPro,
  credits,
  videosCount,
  imagesCount,
}: DashboardClientProps) {
  const { user } = useUser();

  return (
    <>
      {/* ================= LOGGED OUT ================= */}
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-[#070B14]">
          <a
            href="/sign-in"
            className="px-6 py-3 bg-[#16B6B0] text-black rounded-lg font-semibold"
          >
            Sign in to access dashboard
          </a>
        </div>
      </SignedOut>

      {/* ================= LOGGED IN ================= */}
      <SignedIn>
        <div className="min-h-screen py-20 px-6 bg-[#070B14]">
          <div className="max-w-5xl mx-auto text-white">

            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold font-poppins">Dashboard</h1>
                <p className="text-gray-400 mt-1 font-inter">
                  Welcome back, {user?.firstName || "Creator"} 👋
                </p>
              </div>

              {/* Clerk User Menu */}
              <UserButton afterSignOutUrl="/" />
            </div>

            {/* Credit Info Bar */}
            <div className="mb-12 p-6 bg-[#0A0F1A] border border-[#1b2335] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Available Balance</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#16B6B0]">{credits}</span>
                  <span className="text-sm text-gray-300">Premium Credits</span>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href="/pricing"
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#16B6B0] text-black font-semibold text-sm hover:opacity-90 transition text-center"
                >
                  Buy Credits / Upgrade
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-8">
              <a
                href="/video-upload"
                className="bg-[#0F1624] border border-[#1b2335] hover:border-[#16B6B0] p-8 rounded-2xl shadow-xl transition text-center"
              >
                <span className="text-4xl">📹</span>
                <h2 className="text-xl font-semibold font-poppins mt-4">
                  Video Compression
                </h2>
                <p className="text-gray-400 text-sm mt-2 font-inter">
                  Compress high definition videos.
                </p>
              </a>

              <a
                href="/social-share"
                className="bg-[#0F1624] border border-[#1b2335] hover:border-[#16B6B0] p-8 rounded-2xl shadow-xl transition text-center"
              >
                <span className="text-4xl">📷</span>
                <h2 className="text-xl font-semibold font-poppins mt-4">
                  Social Media Resizer
                </h2>
                <p className="text-gray-400 text-sm mt-2 font-inter">
                  Resize images for social media formats.
                </p>
              </a>

              <a
                href="/pricing"
                className="bg-[#0F1624] border border-[#1b2335] hover:border-[#16B6B0] p-8 rounded-2xl shadow-xl transition text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl">⭐</span>
                  <h2 className="text-xl font-semibold font-poppins mt-4">
                    Subscription Tier
                  </h2>
                </div>
                <p className="text-[#16B6B0] text-sm mt-2 font-semibold font-inter">
                  {isPro ? "Pro Member 👑" : "Free Plan"}
                </p>
              </a>
            </div>

            {/* Live Stats Section */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-[#0F1624] border border-[#1b2335] p-6 rounded-xl text-center">
                <h3 className="text-gray-400 font-inter text-sm">
                  Videos Compressed
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#16B6B0]">{videosCount}</p>
              </div>

              <div className="bg-[#0F1624] border border-[#1b2335] p-6 rounded-xl text-center">
                <h3 className="text-gray-400 font-inter text-sm">
                  Images Adjusted
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#16B6B0]">{imagesCount}</p>
              </div>

              <div className="bg-[#0F1624] border border-[#1b2335] p-6 rounded-xl text-center">
                <h3 className="text-gray-400 font-inter text-sm">
                  Account Type
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#16B6B0]">
                  {isPro ? "PRO" : "FREE"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </SignedIn>
    </>
  );
}
