
import { Image } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const PlaceholderImage = () => (
  <div className="flex items-center justify-center w-full h-full bg-champagne-500">
    <Image className="w-12 h-12 text-champagne-300" />
  </div>
);

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x > width * 0.7) {
      e.stopPropagation();
      api?.scrollNext();
    }
  };

  const displayImages = images && images.length > 0 
    ? images 
    : Array(3).fill(null);

  return (
    <div className="relative group" onClick={handleClick}>
      <Carousel className="w-full h-full" setApi={setApi}>
        <CarouselContent>
          {displayImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[1/1] overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <PlaceholderImage />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {displayImages.length > 1 && (
          <>
            <CarouselNext 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full 
                         bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 
                         transition-opacity duration-200 border-none z-20" 
            />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    api?.scrollTo(index);
                  }}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    current === index
                      ? "bg-white scale-110"
                      : "bg-white/60 hover:bg-white/80"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
