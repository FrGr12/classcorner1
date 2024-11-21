import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const categories = [
  { name: "Ceramics", image: "/placeholder.svg", count: "120+ Classes" },
  { name: "Painting", image: "/placeholder.svg", count: "85+ Classes" },
  { name: "Cooking", image: "/placeholder.svg", count: "200+ Classes" },
  { name: "Photography", image: "/placeholder.svg", count: "65+ Classes" },
  { name: "Woodworking", image: "/placeholder.svg", count: "45+ Classes" },
  { name: "Jewelry Making", image: "/placeholder.svg", count: "30+ Classes" },
];

const cities = [
  { name: "New York", image: "/placeholder.svg", count: "250+ Classes" },
  { name: "Los Angeles", image: "/placeholder.svg", count: "180+ Classes" },
  { name: "Chicago", image: "/placeholder.svg", count: "150+ Classes" },
  { name: "San Francisco", image: "/placeholder.svg", count: "120+ Classes" },
  { name: "Austin", image: "/placeholder.svg", count: "90+ Classes" },
  { name: "Seattle", image: "/placeholder.svg", count: "85+ Classes" },
];

const Categories = () => {
  return (
    <section className="py-24 bg-neutral-100">
      <div className="container-padding">
        {/* Categories Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Explore Class Categories</h2>
            <p className="text-neutral-600">
              Discover classes across various creative disciplines
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categories.map((category) => (
                <CarouselItem key={category.name} className="pl-4 md:basis-1/3 lg:basis-1/4">
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{category.name}</h3>
                        <p className="text-sm text-white/80">{category.count}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Cities Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Popular Cities</h2>
            <p className="text-neutral-600">
              Find classes in these creative hubs
            </p>
          </div>
          
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
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{city.name}</h3>
                        <p className="text-sm text-white/80">{city.count}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Categories;