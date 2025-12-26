"use client";

import { useState } from "react";

export default function HomeUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a video file");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title);
    fd.append("description", description);

    try {
      const res = await fetch("/api/video-upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      window.location.href = "/home";
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed, please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-2 w-full" />
      <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="border p-2 w-full" />
      <input type="file" accept="video/*" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload Video</button>
    </form>
  );
}