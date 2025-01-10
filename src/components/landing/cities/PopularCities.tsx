import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

interface City {
  name: string;
  count: string;
}

interface PopularCitiesProps {
  cities: City[];
}

const PopularCities = ({ cities }: PopularCitiesProps) => {
  return (
    <div className="mt-16">
      <h2 className="heading-lg mb-8 text-center">Popular Cities</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {cities.map((city) => (
            <CarouselItem key={city.name} className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden group">
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{city.name}</h3>
                  <p className="text-sm text-neutral-600">{city.count}</p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PopularCities;