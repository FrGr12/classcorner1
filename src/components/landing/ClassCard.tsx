import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ClassCardProps {
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  category?: string;
}

const ClassCard = ({
  title,
  instructor,
  price,
  rating,
  images,
  level,
  category,
}: ClassCardProps) => {
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: "Class Booked!",
      description: `You've successfully booked ${title} with ${instructor}`,
    });
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[3/2]">
        <Carousel className="w-full">
          <CarouselContent>
            {images?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[3/2] w-full">
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden group-hover:flex" />
          <CarouselNext className="hidden group-hover:flex" />
        </Carousel>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <div className="flex gap-2">
            {category && (
              <Badge 
                variant="secondary" 
                className="bg-white text-primary border border-neutral-200 hover:bg-white/90"
              >
                {category}
              </Badge>
            )}
            <Badge 
              variant="secondary" 
              className="bg-white text-primary border border-neutral-200 hover:bg-white/90"
            >
              {level}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">by {instructor}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="font-semibold">${price}</span>
        </div>
        <Button 
          className="w-full"
          onClick={handleBooking}
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};

export default ClassCard;