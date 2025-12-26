"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-20 px-6 bg-[#070B14]">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold font-poppins text-center mb-8">
          Your Profile
        </h1>

        <div className="bg-[#0F1624] border border-[#1b2335] p-6 rounded-2xl shadow-xl">
          <UserProfile routing="hash" />
        </div>

      </div>
    </div>
  );
}
