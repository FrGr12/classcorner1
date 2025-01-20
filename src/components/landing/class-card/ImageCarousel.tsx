import { Image } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  if (!images || images.length === 0) {
    return <PlaceholderImage />;
  }

  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-[4/3] overflow-hidden">
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
      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </>
      )}
    </Carousel>
  );
};

export default ImageCarousel;