"use client";

import { useRef, useState } from "react";
import axios from "axios"; // Fetch ki jagah axios use karna better hai headers control ke liye

function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

export default function VideoUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState("480p");
  const [format, setFormat] = useState("mp4");

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const triggerPicker = () => inputRef.current?.click();

  const resetAll = () => {
    setFile(null);
    setError(null);
    setOutputUrl(null);
    setCompressedSize(null);
    setStatus("idle");
  };

  const onFileChange = (e: any) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;
    setFile(selected);
    setError(null);
    setStatus("idle");
    setOutputUrl(null);
    setCompressedSize(null);
  };

  const processVideo = async () => {
  if (!file) return;

  setStatus("processing");
  setError(null);

  try {
    // 1️⃣ Backend se signature aur preset mangwana
    const signRes = await axios.post("/api/video-upload");
    const signData = signRes.data;

    // 2️⃣ Cloudinary Direct Upload Payload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp", signData.timestamp.toString());
    formData.append("signature", signData.signature);
    formData.append("folder", signData.folder);
    formData.append("eager", signData.eager);
     // 👈 Ye wahi preset hai

    // 3️⃣ Axios POST request with CORS Fix
    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/video/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        transformRequest: [(data, headers) => {
          // 🛡️ Railway/Clerk ke Authorization headers ko Cloudinary par jane se rokna
          delete headers["Authorization"];
          return data;
        }],
      }
    );

    // 4️⃣ Success logic
    const data = uploadRes.data;
    const finalUrl = data.eager?.[0]?.secure_url || data.secure_url;
    
    setOutputUrl(finalUrl);
    setCompressedSize(data.eager?.[0]?.bytes || null);
    setStatus("done");

  } catch (err: any) {
    console.error("Upload Error:", err);
    const errorMsg = err.response?.data?.error || err.message || "Something went wrong";
    setError(errorMsg);
    setStatus("error");
  }
};

  // ... (Baaki saara UI code wahi rahega jo aapne diya tha)
  
  const downloadOutput = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `smartflex-${quality}.${format}`;
    a.click();
  };

  const originalMB = file ? bytesToMB(file.size) : null;
  const compressedMB = compressedSize ? bytesToMB(compressedSize) : null;

  const reduction =
    file && compressedSize
      ? `${Math.max(0, Math.round((1 - compressedSize / file.size) * 100))}%`
      : null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Aapka UI code yahan se continue hoga... */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-poppins">Video Compression</h1>
        <span className="px-4 py-1 text-sm rounded-full bg-[#0F1624] border border-[#1b2335]">
          SmartFlex
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="bg-[#0F1624] p-6 rounded-2xl border border-[#1b2335] shadow-xl space-y-4">
            <h2 className="text-xl font-semibold font-poppins">Step 1 — Choose Video</h2>
            <input ref={inputRef} type="file" accept="video/*" hidden onChange={onFileChange} />
            <div className="flex gap-4">
              <button onClick={triggerPicker} className="px-5 py-2 rounded-lg bg-[#0B1B36] hover:bg-[#12284d] transition text-white font-medium">
                Choose File
              </button>
              <button onClick={resetAll} disabled={!file} className="px-5 py-2 rounded-lg border border-gray-500 text-gray-300 disabled:opacity-40">
                Reset
              </button>
            </div>
            {file && (
              <div className="text-sm text-gray-300 space-y-1">
                <p className="font-medium">Original Size: {originalMB} MB</p>
                <p className="text-gray-400">{file.name}</p>
              </div>
            )}
          </div>

          <div className="bg-[#0F1624] p-6 rounded-2xl border border-[#1b2335] shadow-xl space-y-5">
            <h2 className="text-xl font-semibold font-poppins">Step 2 — Options</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-300">Quality</label>
                <select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 rounded-lg px-3 py-2">
                  <option value="480p">480p (Free)</option>
                  <option value="720p">720p (Pro)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-300">Format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 rounded-lg px-3 py-2">
                  <option value="mp4">MP4</option>
                  <option value="webm">WebM</option>
                </select>
              </div>
            </div>
            <button onClick={processVideo} disabled={!file || status === "processing"} className="px-6 py-2 bg-[#16B6B0] text-black rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-40">
              {status === "processing" ? "Processing…" : "Compress Video"}
            </button>
            {status === "error" && error && <p className="text-red-400 text-sm">Error: {error}</p>}
          </div>
        </div>

        <div className="bg-[#0F1624] p-6 rounded-2xl border border-[#1b2335] shadow-xl">
          <h2 className="text-xl font-semibold font-poppins mb-4">Step 3 — Result</h2>
          {status === "idle" && <p className="text-gray-400 text-sm">Select a video to get started.</p>}
          {status === "processing" && (
            <div className="space-y-3">
              <div className="animate-spin h-6 w-6 border-2 border-t-transparent border-gray-300 rounded-full"></div>
              <p className="text-gray-400 text-sm">Uploading & processing…</p>
            </div>
          )}
          {status === "done" && outputUrl && (
            <div className="space-y-6">
              <video src={outputUrl} controls className="w-full rounded-xl" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><p className="text-gray-400 text-sm">Original</p><p className="text-white font-medium">{originalMB} MB</p></div>
                <div><p className="text-gray-400 text-sm">Compressed</p><p className="text-white font-medium">{compressedMB} MB</p></div>
                <div><p className="text-gray-400 text-sm">Reduction</p><p className="text-white font-medium">{reduction}</p></div>
              </div>
              <div className="flex gap-4">
                <button onClick={downloadOutput} className="px-5 py-2 bg-[#16B6B0] text-black rounded-lg font-semibold hover:opacity-90">Download Video</button>
                <button onClick={resetAll} className="px-5 py-2 border border-gray-500 text-gray-300 rounded-lg">Process Another</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}