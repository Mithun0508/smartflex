"use client";

import React, { useState, useRef } from "react";
import { CldImage } from "next-cloudinary";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080 },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350 },
  "Twitter Post (16:9)": { width: 1200, height: 675 },
  "Twitter Header (3:1)": { width: 1500, height: 500 },
  "Facebook Cover (205:78)": { width: 820, height: 312 },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] =
    useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/image-upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Upload failed");

      setUploadedImage(data.publicId);
    } catch (err) {
      alert("Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!uploadedImage) return;

    const { width, height } = socialFormats[selectedFormat];

    const finalURL = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${width},h_${height}/${uploadedImage}.png`;

    const blob = await fetch(finalURL).then((r) => r.blob());
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = selectedFormat.replace(/\s+/g, "_").toLowerCase() + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-poppins">Image Adjustment</h1>
        <span className="px-4 py-1 text-sm rounded-full bg-[#0F1624] border border-[#1b2335]">
          SmartFlex
        </span>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="space-y-8">

          {/* STEP 1 — UPLOAD */}
          <div className="bg-[#0F1624] p-6 rounded-2xl border border-[#1b2335] shadow-xl space-y-4">
            <h2 className="text-xl font-semibold font-poppins">Step 1 — Upload Image</h2>

            <label className="block bg-[#05070D] border border-[#1b2335] rounded-xl p-4 cursor-pointer hover:bg-[#0A0F1A] transition text-center text-gray-300">
              <span className="block font-medium">Click to Upload</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
              />
            </label>

            {isUploading && (
              <div className="w-full bg-[#1b2335] h-2 rounded-xl overflow-hidden">
                <div className="h-full bg-[#16B6B0] animate-pulse"></div>

              </div>

            )}

            {uploadedImage && (
              <p className="text-sm text-gray-400">Image uploaded successfully.</p>
            )}
            <p className="text-yellow-400 text-xs mt-2 text-center">
              ⚠️ Don’t leave this page during processing. Leaving may cancel the operation.
            </p>
          </div>

          {/* STEP 2 — FORMAT */}
          {uploadedImage && (
            <div className="bg-[#0F1624] p-6 rounded-2xl border border-[#1b2335] shadow-xl space-y-5">
              <h2 className="text-xl font-semibold font-poppins">Step 2 — Choose Format</h2>

              <select
                className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 rounded-lg px-3 py-2"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
              >
                {Object.keys(socialFormats).map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* RIGHT PANEL — PREVIEW */}
        <div className="bg-[#0F1624] p-6 rounded-2xl border border-[#1b2335] shadow-xl">

          <h2 className="text-xl font-semibold font-poppins mb-4">Step 3 — Preview</h2>

          {!uploadedImage && (
            <p className="text-gray-400 text-sm">Upload an image to begin.</p>
          )}

          {uploadedImage && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <CldImage
                  width={socialFormats[selectedFormat].width}
                  height={socialFormats[selectedFormat].height}
                  crop="fill"
                  gravity="auto"
                  src={uploadedImage}
                  alt="preview"
                  ref={imageRef}
                  className="rounded-xl shadow-lg"
                />
              </div>


              <button
                onClick={handleDownload}
                disabled={isUploading}
                className={`px-5 py-2 bg-[#16B6B0] text-black rounded-lg font-semibold transition
    ${isUploading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}
  `}
              >
                {isUploading ? "Processing…" : `Download for ${selectedFormat}`}
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
