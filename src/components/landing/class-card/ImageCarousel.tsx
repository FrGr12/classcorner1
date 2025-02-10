
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Image } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const PlaceholderImage = () => (
  <div className="flex items-center justify-center w-full h-full bg-neutral-200">
    <Image className="w-12 h-12 text-neutral-400" />
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
    : Array(6).fill(null);

  return (
    <div className="relative group h-full flex items-center justify-center" onClick={handleClick}>
      <Carousel 
        className="w-full h-full flex items-center justify-center" 
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          skipSnaps: false,
          dragFree: true
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4 flex justify-center">
          {displayImages.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                {image ? (
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
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
            <CarouselPrevious 
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full 
                        bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 border-none z-20" 
            />
            <CarouselNext 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full 
                        bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 border-none z-20" 
            />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
