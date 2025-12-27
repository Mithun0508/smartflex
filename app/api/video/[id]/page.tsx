import { getPrisma } from "@/lib/db";

function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

export default async function VideoPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return <p className="p-6 text-red-400">Invalid video ID</p>;
  }

  const video = await getPrisma().video.findUnique({
    where: { id },
  });

  if (!video) return <p className="p-6 text-red-400">Video not found</p>;

  // ✅ Calculate reduction %
  let reduction: string | null = null;
  let largerThanOriginal = false;

  if (video.originalSize && video.compressedSize) {
    if (video.compressedSize < video.originalSize) {
      const diff = video.originalSize - video.compressedSize;
      const percent = (diff / video.originalSize) * 100;
      reduction = `↓ ${percent.toFixed(1)}%`;
    } else if (video.compressedSize > video.originalSize) {
      largerThanOriginal = true;
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <video
        src={video.compressedUrl || video.secureUrl}
        controls
        className="w-full rounded-lg shadow-lg"
      />

      <h1 className="mt-4 text-2xl font-bold text-white">{video.title}</h1>
      <p className="text-gray-400 mt-2">{video.description}</p>

      {/* ✅ Status badge */}
      <span
        className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
          video.status === "COMPLETE"
            ? "bg-green-600 text-white"
            : video.status === "FAILED"
            ? "bg-red-600 text-white"
            : "bg-yellow-500 text-black"
        }`}
      >
        {video.status}
      </span>

      <div className="text-sm mt-3 text-gray-500 space-y-1">
        <p>Original size: {formatBytes(video.originalSize)}</p>
        <p>
          Compressed size: {formatBytes(video.compressedSize)}{" "}
          {video.compressedSize === video.originalSize && (
            <span className="text-yellow-400">(no reduction)</span>
          )}
          {reduction && <span className="text-green-400">{reduction}</span>}
          {largerThanOriginal && (
            <span className="text-red-400">(larger than original)</span>
          )}
        </p>
        <p>Uploaded on {new Date(video.createdAt).toLocaleDateString()}</p>
      </div>

      {video.compressedUrl && (
        <a href={video.compressedUrl} download>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Download Compressed Video
          </button>
        </a>
      )}

      <a
        href="/video-upload"
        className="inline-block mt-3 text-blue-400 hover:underline"
      >
        Compress more videos
      </a>
    </div>
  );
}
