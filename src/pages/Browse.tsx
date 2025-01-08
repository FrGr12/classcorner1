import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import ClassGrid from "@/components/landing/ClassGrid";
import Footer from "@/components/landing/Footer";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Austin",
  "Seattle",
];

const categories = [
  { name: "Painting & Art", icon: "🎨" },
  { name: "Baking", icon: "🥖" },
  { name: "Candle Making", icon: "🕯️" },
  { name: "Cocktail & Wine", icon: "🍷" },
  { name: "Cooking", icon: "👨‍🍳" },
  { name: "Wood Craft", icon: "🪚" },
  { name: "Jewellery & Metal Craft", icon: "💍" },
  { name: "Textile Craft", icon: "🧵" },
  { name: "Flower & Plants", icon: "🌸" },
  { name: "Pottery", icon: "🏺" },
  { name: "Photography", icon: "📸" },
  { name: "Music & Dance", icon: "🎵" },
  { name: "Paper Craft", icon: "📜" },
];

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("featured");
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (selectedCity) params.set("city", selectedCity);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-panel p-2 rounded-full flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="What do you want to do?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-0 focus-visible:ring-0 p-0 h-auto placeholder:text-neutral-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <MapPin className="w-5 h-5 text-neutral-400" />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="border-0 p-0 h-auto w-[140px]">
                  <SelectValue placeholder="Pick a city (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city.toLowerCase()}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <button 
              className="button-primary rounded-full whitespace-nowrap"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
              Browse Classes
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => setSelectedCategory("featured")}>
                All Classes
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ClassGrid category={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;