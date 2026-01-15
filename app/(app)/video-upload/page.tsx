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
    if (!file) return;

    setStatus("processing");
    setError(null);

    try {
      // 1️⃣ Signature lo
      const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
      const { signature, timestamp, apiKey, cloudName } = await signRes.json();

      // 2️⃣ Direct Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "smartflex/videos");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        { method: "POST", body: formData }
      );

      const data = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      // 💥 APPLY 480p COMPRESSION HERE
      const compressedUrl = data.secure_url.replace(
        "/upload/",
        "/upload/c_scale,h_480/"
      );

      // ⭐ SHOW COMPRESSED VIDEO IN UI
      setOutputUrl(compressedUrl);
      setStatus("done");

    } catch (err: any) {
      setError(err.message || "Upload failed");
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
