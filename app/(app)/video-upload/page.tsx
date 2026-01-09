"use client";

import { useRef, useState } from "react";

function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

export default function VideoUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const triggerPicker = () => inputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;

    setFile(selected);
    setError(null);
    setStatus("idle");
    setOutputUrl(null);
  };

  const processVideo = async () => {
    if (!file) {
      setError("Please choose a video");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/video-upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.originalUrl) {
        throw new Error(data.error || "Upload failed");
      }

      // ✅ IMPORTANT FIX
      setOutputUrl(data.originalUrl);
      setStatus("done");
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      setStatus("error");
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={onFileChange}
      />

      <button onClick={triggerPicker}>Choose File</button>

      {file && (
        <p>
          Original Size: {bytesToMB(file.size)} MB <br />
          {file.name}
        </p>
      )}

      <button onClick={processVideo}>Compress Video</button>

      {status === "processing" && <p>Uploading…</p>}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}

      {status === "done" && outputUrl && (
        <div>
          <p>Upload successful 🎉</p>
          <a href={outputUrl} target="_blank">Open Video</a>
        </div>
      )}
    </div>
  );
}
