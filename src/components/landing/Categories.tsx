import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ClassGrid from "./ClassGrid";

const categories = [
  { name: "Ceramics", image: "/placeholder.svg", count: "120+ Classes", icon: "🏺" },
  { name: "Painting", image: "/placeholder.svg", count: "85+ Classes", icon: "🎨" },
  { name: "Cooking", image: "/placeholder.svg", count: "200+ Classes", icon: "👨‍🍳" },
  { name: "Photography", image: "/placeholder.svg", count: "65+ Classes", icon: "📸" },
  { name: "Woodworking", image: "/placeholder.svg", count: "45+ Classes", icon: "🪚" },
  { name: "Jewelry", image: "/placeholder.svg", count: "30+ Classes", icon: "💍" },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container-padding">
        {/* Category Pills */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full transition-all",
                  "hover:shadow-md",
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-white text-neutral-600"
                )}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.slice(0, 4).map((category) => (
            <Card key={category.name} className="overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Classes in Selected Category */}
        {selectedCategory && (
          <div className="mt-12">
            <h2 className="heading-lg mb-8">Classes in {selectedCategory}</h2>
            <ClassGrid category={selectedCategory} />
          </div>
        )}

        {/* Popular Cities */}
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
                    <div className="relative aspect-[4/3]">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
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