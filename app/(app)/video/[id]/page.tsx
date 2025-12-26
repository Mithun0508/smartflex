"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { filesize } from "filesize"; // ✅ fixed import
import { PlayCircle, FileVideo, Minimize } from "lucide-react"; // ✅ replaced Compress with Minimize
import toast from "react-hot-toast";

type Video = {
  id: string;
  title: string;
  description: string;
  secureUrl: string;
  compressedUrl?: string;
  originalSize?: number;
  compressedSize?: number;
  createdAt: string;
};

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await fetch(`/api/video/${id}`);
        const data = await res.json();
        setVideo(data.video);
      } catch (err) {
        toast.error("Failed to load video details");
      }
    }
    fetchVideo();
  }, [id]);

  if (!video) return <div className="p-6">Loading...</div>;

  const reduction =
    video.originalSize && video.compressedSize
      ? Math.round(
          ((video.originalSize - video.compressedSize) / video.originalSize) *
            100
        )
      : null;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
        <FileVideo className="w-7 h-7" /> {video.title}
      </h1>
      <p className="text-secondary">{video.description}</p>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Original Video */}
        <div className="space-y-3">
          <h2 className="font-semibold flex items-center gap-2 text-lg">
            <PlayCircle className="w-6 h-6 text-primary" /> Original Video
          </h2>
          <video
            src={video.secureUrl}
            controls
            className="w-full rounded-lg border border-neutral shadow"
          />
          <p className="text-sm text-secondary">
            Size: {filesize(video.originalSize || 0)} • Uploaded{" "}
            {dayjs(video.createdAt).format("DD MMM YYYY")}
          </p>
        </div>

        {/* Compressed Video */}
        <div className="space-y-3">
          <h2 className="font-semibold flex items-center gap-2 text-lg">
            <Minimize className="w-6 h-6 text-accent" /> Compressed Video
          </h2>
          {video.compressedUrl ? (
            <>
              <video
                src={video.compressedUrl}
                controls
                className="w-full rounded-lg border border-neutral shadow"
              />
              <p className="text-sm text-secondary">
                Size: {filesize(video.compressedSize || 0)} • Reduction:{" "}
                {reduction ? `${reduction}%` : "N/A"}
              </p>
              {reduction && (
                <span className="badge badge-accent">
                  Optimized by {reduction}%
                </span>
              )}
            </>
          ) : (
            <p className="text-sm text-error">Compression not available</p>
          )}
        </div>
      </div>
    </div>
  );
}
