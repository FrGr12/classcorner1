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
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";

const categories = [
  { name: "Pottery", count: "95+ Classes", icon: "🏺" },
  { name: "Cooking", count: "200+ Classes", icon: "👨‍🍳" },
  { name: "Baking", count: "85+ Classes", icon: "🥖" },
  { name: "Painting & Art", count: "120+ Classes", icon: "🎨" },
  { name: "Cocktail & Wine", count: "60+ Classes", icon: "🍷" },
  { name: "Photography", count: "80+ Classes", icon: "📸" },
  { name: "Music & Dance", count: "150+ Classes", icon: "🎵" },
  { name: "Candle Making", count: "45+ Classes", icon: "🕯️" },
  { name: "Wood Craft", count: "75+ Classes", icon: "🪚" },
  { name: "Jewellery & Metal Craft", count: "90+ Classes", icon: "💍" },
  { name: "Textile Craft", count: "110+ Classes", icon: "🧵" },
  { name: "Paper Craft", count: "40+ Classes", icon: "📜" },
  { name: "Flower & Plants", count: "70+ Classes", icon: "🌸" },
];

const cities = [
  { name: "New York", count: "250+ Classes" },
  { name: "Los Angeles", count: "180+ Classes" },
  { name: "Chicago", count: "150+ Classes" },
  { name: "San Francisco", count: "120+ Classes" },
  { name: "Austin", count: "90+ Classes" },
  { name: "Seattle", count: "85+ Classes" },
];

const swedishCities = [
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
  "Jönköping",
  "Norrköping",
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("Everywhere");
  const [selectedTime, setSelectedTime] = useState<string>("Any week");
  const [open, setOpen] = useState(false);

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container-padding">
        {/* Filter Options */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant="outline"
            className={cn(
              "rounded-full",
              !selectedCategory && "bg-accent-purple text-white hover:bg-accent-purple/90"
            )}
            onClick={() => setSelectedCategory(null)}
          >
            All classes
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            {selectedLocation}
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
          >
            {selectedTime}
          </Button>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search locations..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggested locations">
                {swedishCities.map((city) => (
                  <CommandItem
                    key={city}
                    onSelect={(value) => {
                      setSelectedLocation(value);
                      setOpen(false);
                    }}
                  >
                    {city}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex gap-4 pb-4 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
                className={cn(
                  "flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap min-w-fit",
                  selectedCategory === category.name
                    ? "bg-accent-purple text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-50"
                )}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Classes Display */}
        <div className="mt-12">
          <ClassGrid category={selectedCategory} />
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
