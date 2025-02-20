
import { Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  title: string;
  variant?: 'large' | 'small';
}

const PlaceholderImage = () => (
  <div className="flex items-center justify-center w-full h-full bg-neutral-200">
    <Image className="w-12 h-12 text-neutral-400" />
  </div>
);

const ImageCarousel = ({ images, title, variant = 'small' }: ImageCarouselProps) => {
  const image = images && images.length > 0 ? images[0] : null;
  
  const wrapperClasses = cn(
    variant === 'large' ? "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : "relative"
  );

  const containerClasses = cn(
    variant === 'large' ? "aspect-[2/1] sm:aspect-[21/9]" : "absolute inset-0"
  );

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        {image ? (
          <img
            src={image}
            alt={`${title}`}
            className={cn(
              "w-full h-full object-cover",
              variant === 'large' && "rounded-lg shadow-sm"
            )}
          />
        ) : (
          <div className="w-full h-full">
            <PlaceholderImage />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
