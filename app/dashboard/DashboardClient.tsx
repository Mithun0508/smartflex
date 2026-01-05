"use client";

import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

export default function DashboardClient() {
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
                    <div className="max-w-5xl mx-auto">

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
                                <p className="text-gray-400 text-sm mt-2">
                                    Compress HD videos fast.
                                </p>
                            </a>

                            <a
                                href="/image-upload"
                                className="bg-[#0F1624] border border-[#1b2335] hover:border-[#16B6B0] p-8 rounded-2xl shadow-xl transition text-center"
                            >
                                <span className="text-4xl">📷</span>
                                <h2 className="text-xl font-semibold font-poppins mt-4">
                                    Image Adjustment
                                </h2>
                                <p className="text-gray-400 text-sm mt-2">
                                    Resize images for social media.
                                </p>
                            </a>

                            <a
                                href="/pricing"
                                className="bg-[#0F1624] border border-[#1b2335] hover:border-[#16B6B0] p-8 rounded-2xl shadow-xl transition text-center"
                            >
                                <span className="text-4xl">⭐</span>
                                <h2 className="text-xl font-semibold font-poppins mt-4">
                                    Upgrade to Pro
                                </h2>
                                <p className="text-gray-400 text-sm mt-2">
                                    Unlock all advanced tools.
                                </p>
                            </a>
                        </div>

                        {/* Future Stats Section */}
                        <div className="mt-16 grid md:grid-cols-3 gap-8">
                            <div className="bg-[#0F1624] border border-[#1b2335] p-6 rounded-xl text-center">
                                <h3 className="text-gray-400 font-inter">
                                    Videos Compressed
                                </h3>
                                <p className="text-3xl font-bold mt-2">0</p>
                            </div>

                            <div className="bg-[#0F1624] border border-[#1b2335] p-6 rounded-xl text-center">
                                <h3 className="text-gray-400 font-inter">
                                    Images Adjusted
                                </h3>
                                <p className="text-3xl font-bold mt-2">0</p>
                            </div>

                            <div className="bg-[#0F1624] border border-[#1b2335] p-6 rounded-xl text-center">
                                <h3 className="text-gray-400 font-inter">
                                    Account Type
                                </h3>
                                <p className="text-3xl font-bold mt-2">0</p>
                            </div>
                        </div>

                    </div>
                </div>
            </SignedIn>
        </>
    );
}
