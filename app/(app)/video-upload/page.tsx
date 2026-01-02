"use client";

import { useRef, useState } from "react";

function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

export default function VideoUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<"480p" | "720p" | "1080p">("480p");
  const [format, setFormat] = useState<"mp4" | "webm" | "mov">("mp4");

  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const triggerPicker = () => inputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;

    if (selected.size === 0) {
      setError("Empty file selected.");
      return;
    }

    setFile(selected);
    setError(null);
    setStatus("idle");
    setOutputUrl(null);
    setCompressedSize(null);
  };

  const processVideo = async () => {
    const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200MB

    if (!file) {
      setError("Please choose a video first.");
      setStatus("error");
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      setError("Free plan allows max 200MB video.");
      setStatus("error");
      return;
    }

    // 🔒 Pro locks
    if (quality === "720p") {
      setError("720p is a Pro feature (Coming Soon 🚀)");
      setStatus("error");
      return;
    }

    if (quality === "1080p") {
      setError("1080p is under optimization (Coming Soon 🚀)");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("target", quality);

      const res = await fetch("/api/video-upload", {
        method: "POST",
        body: fd,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(text || "Unexpected error");
      }

      if (!res.ok || !data.compressed?.url) {
        throw new Error(data?.error || "Compression failed");
      }

      setOutputUrl(data.compressed.url);
      setCompressedSize(data.compressed.bytes || null);
      setStatus("done");
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      setStatus("error");
    }
  };



  const downloadOutput = () => {
    if (!outputUrl) return;

    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `smartflex-${quality}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAll = () => {
    setFile(null);
    setStatus("idle");
    setError(null);
    setOutputUrl(null);
    setCompressedSize(null);
  };

  const originalMB = file ? bytesToMB(file.size) : null;
  const compressedMB = compressedSize ? bytesToMB(compressedSize) : null;

  const reduction =
    file && compressedSize
      ? `${Math.max(0, Math.round((1 - compressedSize / file.size) * 100))}%`
      : null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
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

            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              hidden
              onChange={onFileChange}
            />

            <div className="flex gap-4">
              <button
                onClick={triggerPicker}
                className="px-5 py-2 rounded-lg bg-[#0B1B36] hover:bg-[#12284d] transition text-white font-medium"
              >
                Choose File
              </button>

              <button
                onClick={resetAll}
                disabled={!file}
                className="px-5 py-2 rounded-lg border border-gray-500 text-gray-300 disabled:opacity-40"
              >
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
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as any)}
                  className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 rounded-lg px-3 py-2"
                >
                  <option value="480p">480p (Free)</option>
                  <option value="720p">720p (Pro - Coming Soon)</option>
                  <option value="1080p">1080p (Pro – Coming Soon)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full bg-[#05070D] border border-[#1b2335] text-gray-200 rounded-lg px-3 py-2"
                >
                  <option value="mp4">MP4</option>
                  <option value="webm">WebM</option>
                  <option value="mov">MOV</option>
                </select>
              </div>
            </div>

            <button
              onClick={processVideo}
              disabled={!file || status === "processing"}
              className="px-6 py-2 bg-[#16B6B0] text-black rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-40"
            >
              {status === "processing" ? "Processing…" : "Compress Video"}
            </button>

            {status === "error" && error && (
              <p className="text-red-400 text-sm">Error: {error}</p>
            )}
          </div>
        </div>

        <div className="bg-[#0F1624] p-6 rounded-2xl border border-[#1b2335] shadow-xl">
          <h2 className="text-xl font-semibold font-poppins mb-4">Step 3 — Result</h2>

          {status === "idle" && (
            <p className="text-gray-400 text-sm">Select a video to get started.</p>
          )}

          {status === "processing" && (
            <div className="space-y-3">
              <div className="animate-spin h-6 w-6 border-2 border-t-transparent border-gray-300 rounded-full"></div>
              <p className="text-gray-400 text-sm">Uploading & processing…</p>
              <p className="text-yellow-400 text-xs mt-2">
                ⚠️ Don’t leave this page during processing.
              </p>
            </div>
          )}

          {status === "done" && outputUrl && (
            <div className="space-y-6">
              <video src={outputUrl} controls className="w-full rounded-xl" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Original</p>
                  <p className="text-white font-medium">{originalMB} MB</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Compressed</p>
                  <p className="text-white font-medium">{compressedMB} MB</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Reduction</p>
                  <p className="text-white font-medium">{reduction}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={downloadOutput}
                  className="px-5 py-2 bg-[#16B6B0] text-black rounded-lg font-semibold hover:opacity-90"
                >
                  Download Video
                </button>

                <button
                  onClick={resetAll}
                  className="px-5 py-2 border border-gray-500 text-gray-300 rounded-lg"
                >
                  Process Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
