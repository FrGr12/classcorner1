
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import ClassGrid from "@/components/landing/ClassGrid";
import Footer from "@/components/landing/Footer";
import { Search, MapPin, Calendar, Filter, Sparkles, TrendingUp, Clock, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  "Pottery",
  "Cooking",
  "Baking",
  "Painting & Art",
  "Candle Making",
  "Jewellery & Metal",
  "Cocktail & Wine",
  "Photography",
  "Music & Dance",
  "Wood Craft",
  "Textile Craft",
  "Paper Craft",
  "Flower & Plants",
];

const sortOptions = [
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Top Rated", value: "top-rated", icon: Star },
  { label: "Last Minute Deals", value: "last-minute", icon: Clock },
  { label: "This Week", value: "this-week", icon: Calendar },
  { label: "Recommended", value: "recommended", icon: Sparkles },
];

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "recommended");
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : undefined
  );
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (selectedCity) params.set("city", selectedCity);
    if (date) params.set("date", date.toISOString());
    if (sortBy) params.set("sort", sortBy);
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };

  const SortIcon = sortOptions.find(option => option.value === sortBy)?.icon || Sparkles;

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
                  <SelectValue placeholder="Pick a city" />
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-full gap-2 bg-white hover:bg-white/90 border-0"
                >
                  <SortIcon className="w-4 h-4 text-primary" />
                  <span className="text-primary">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className="flex items-center gap-2 hover:bg-primary/5"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-primary">{option.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              className="button-primary rounded-full whitespace-nowrap"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr]">
          <div>
            <div className="mb-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Category
                  </h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Filter */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {date ? format(date, 'EEE, MMM d') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Price Range Filter */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 200]}
                      max={200}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-6"
                    />
                    <div className="flex justify-between mt-2 text-sm text-neutral-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ClassGrid 
              category={selectedCategory === "all" ? null : selectedCategory} 
              sortBy={sortBy}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
