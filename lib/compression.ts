export type CompressionLevel = "low" | "medium" | "high";

export function getCompressedVideoUrl(publicId: string, level: CompressionLevel = "low") {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;

  let params = "";
  switch (level) {
    case "low":
      // Aggressive compression: 480p, 500kbps
      params = "q_auto:low,vc_h264,br_500k,w_854,h_480";
      break;
    case "medium":
      // Balanced compression: 720p, 800kbps
      params = "q_auto:eco,vc_h264,br_800k,w_1280,h_720";
      break;
    case "high":
      // High quality: 1080p, 1200kbps
      params = "q_auto:good,vc_h264,br_1200k,w_1920,h_1080";
      break;
  }

  return `https://res.cloudinary.com/${cloudName}/video/upload/${params}/${publicId}.mp4`;
}
