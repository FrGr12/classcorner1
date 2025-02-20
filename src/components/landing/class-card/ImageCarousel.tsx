
import { Image, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
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

  const image = images && images.length > 0 ? images[0] : null;
  return (
    <div className="absolute inset-0">
      {image ? (
        <img
          src={image}
          alt={`${title}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full">
          <PlaceholderImage />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

