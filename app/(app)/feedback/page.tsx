"use client";
import { useState } from "react";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });


    if (res.ok) setSubmitted(true);
  };


  return (
    <section className="py-20 bg-[#070B14] min-h-screen">
      <div className="max-w-2xl mx-auto px-6">

        {/* HEADER */}
        <h1 className="text-4xl font-bold font-poppins text-center">
          Share Your Feedback
        </h1>
        <p className="text-gray-400 text-center mt-3 mb-10 font-inter">
          Help us improve SmartFlex — we value every suggestion.
        </p>

        {/* FORM */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0F1624] border border-[#1b2335] p-8 rounded-2xl shadow-xl space-y-6"
          >
            {/* NAME */}
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium font-inter">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#16B6B0]"
                placeholder="Your name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium font-inter">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#16B6B0]"
                placeholder="you@example.com"
              />
            </div>

            {/* FEEDBACK */}
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-medium font-inter">
                Feedback
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 px-4 py-3 rounded-lg resize-none focus:outline-none focus:border-[#16B6B0]"
                placeholder="Tell us what you think..."
              ></textarea>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-[#16B6B0] text-black rounded-lg py-3 font-semibold hover:opacity-90 transition"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="bg-[#0F1624] border border-[#1b2335] p-10 rounded-2xl shadow-xl text-center">
            <span className="text-5xl block mb-4">✅</span>
            <h2 className="text-2xl font-semibold font-poppins mb-2">
              Thank you!
            </h2>
            <p className="text-gray-400 font-inter max-w-md mx-auto">
              Your feedback has been received. We’ll use it to improve SmartFlex.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
