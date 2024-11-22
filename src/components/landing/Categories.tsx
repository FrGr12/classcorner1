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
  { name: "Painting & Art", image: "/placeholder.svg", count: "120+ Classes", icon: "🎨" },
  { name: "Baking", image: "/placeholder.svg", count: "85+ Classes", icon: "🥖" },
  { name: "Candle Making", image: "/placeholder.svg", count: "45+ Classes", icon: "🕯️" },
  { name: "Cocktail & Wine", image: "/placeholder.svg", count: "60+ Classes", icon: "🍷" },
  { name: "Cooking", image: "/placeholder.svg", count: "200+ Classes", icon: "👨‍🍳" },
  { name: "Wood Craft", image: "/placeholder.svg", count: "75+ Classes", icon: "🪚" },
  { name: "Jewellery & Metal Craft", image: "/placeholder.svg", count: "90+ Classes", icon: "💍" },
  { name: "Textile Craft", image: "/placeholder.svg", count: "110+ Classes", icon: "🧵" },
  { name: "Flower & Plants", image: "/placeholder.svg", count: "70+ Classes", icon: "🌸" },
  { name: "Pottery", image: "/placeholder.svg", count: "95+ Classes", icon: "🏺" },
  { name: "Photography", image: "/placeholder.svg", count: "80+ Classes", icon: "📸" },
  { name: "Music & Dance", image: "/placeholder.svg", count: "150+ Classes", icon: "🎵" },
  { name: "Paper Craft", image: "/placeholder.svg", count: "40+ Classes", icon: "📜" },
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

        {/* Classes Display */}
        <div className="mt-12">
          <h2 className="heading-lg mb-8">
            {selectedCategory 
              ? `Classes in ${selectedCategory}`
              : "Highly Rated Classes"}
          </h2>
          <ClassGrid category={selectedCategory || "featured"} />
        </div>

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
