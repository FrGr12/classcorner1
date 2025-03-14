
import { Image, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
  images: string[];
  title: string;
  variant?: 'large' | 'small';
  onError?: () => void;
}

const PlaceholderImage = () => (
  <div className="flex items-center justify-center w-full h-full bg-neutral-200">
    <Image className="w-12 h-12 text-neutral-400" />
  </div>
);

const ImageCarousel = ({ images, title, variant = 'small', onError }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = images && images.length > 1;
  const currentImage = images && images.length > 0 ? images[currentIndex] : null;
  
  const wrapperClasses = cn(
    "relative w-full h-full",
    variant === 'large' ? "max-w-full mx-auto px-0 sm:max-w-7xl sm:px-6 lg:px-8" : ""
  );

  const containerClasses = cn(
    "relative w-full h-full",
    variant === 'large' ? "aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"
  );

  const imageClasses = cn(
    "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
    variant === 'large' && "sm:rounded-lg"
  );

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleImageError = () => {
    onError?.();
  };

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        {currentImage ? (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={currentImage}
              alt={`${title} - Image ${currentIndex + 1}`}
              className={imageClasses}
              onError={handleImageError}
            />
            {variant === 'large' && hasMultipleImages && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md z-10"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md z-10"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentIndex ? "bg-white" : "bg-white/50"
                      )}
                      onClick={(e) => handleDotClick(e, index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <PlaceholderImage />
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
