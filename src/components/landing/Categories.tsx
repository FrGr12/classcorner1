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
  { name: "Painting & Art", count: "120+ Classes", icon: "🎨" },
  { name: "Baking", count: "85+ Classes", icon: "🥖" },
  { name: "Candle Making", count: "45+ Classes", icon: "🕯️" },
  { name: "Cocktail & Wine", count: "60+ Classes", icon: "🍷" },
  { name: "Cooking", count: "200+ Classes", icon: "👨‍🍳" },
  { name: "Wood Craft", count: "75+ Classes", icon: "🪚" },
  { name: "Jewellery & Metal Craft", count: "90+ Classes", icon: "💍" },
  { name: "Textile Craft", count: "110+ Classes", icon: "🧵" },
  { name: "Flower & Plants", count: "70+ Classes", icon: "🌸" },
  { name: "Pottery", count: "95+ Classes", icon: "🏺" },
  { name: "Photography", count: "80+ Classes", icon: "📸" },
  { name: "Music & Dance", count: "150+ Classes", icon: "🎵" },
  { name: "Paper Craft", count: "40+ Classes", icon: "📜" },
];

const cities = [
  { name: "New York", count: "250+ Classes" },
  { name: "Los Angeles", count: "180+ Classes" },
  { name: "Chicago", count: "150+ Classes" },
  { name: "San Francisco", count: "120+ Classes" },
  { name: "Austin", count: "90+ Classes" },
  { name: "Seattle", count: "85+ Classes" },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container-padding">
        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "flex items-center gap-1 px-1.5 py-1 rounded-full transition-all whitespace-nowrap text-xs border border-primary/20",
                  "hover:shadow-md min-w-fit",
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-white text-neutral-600"
                )}
              >
                <span className="text-sm">{category.icon}</span>
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
      </div>
    </section>
  );
};

export default Categories;