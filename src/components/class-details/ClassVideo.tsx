
import { useState } from "react";
import { Play, Loader2 } from "lucide-react";

interface ClassVideoProps {
  videoUrl?: string;
  title: string;
}

const ClassVideo = ({ videoUrl, title }: ClassVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!videoUrl) {
    return null;
  }

  // Function to get embed URL based on video URL type (YouTube, Vimeo, etc.)
  const getEmbedUrl = (url: string) => {
    // YouTube URL handling
    if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
      // Convert standard YouTube URL to embed URL
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
      const match = url.match(youtubeRegex);
      return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }
    
    // Vimeo URL handling
    if (url.includes('vimeo.com')) {
      const vimeoRegex = /vimeo\.com\/(\d+)/;
      const match = url.match(vimeoRegex);
      return match ? `https://player.vimeo.com/video/${match[1]}` : url;
    }
    
    // If it's already an embed URL or another format, return as is
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-lg font-medium mb-4">Class Preview Video</h3>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
            <Play className="h-12 w-12 mb-2" />
            <p>Video unavailable</p>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            title={`${title} video preview`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </div>
    </div>
  );
};

export default ClassVideo;
