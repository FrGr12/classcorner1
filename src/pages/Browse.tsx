
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
import { cn } from "@/lib/utils";

const cities = [
  "New York", "Los Angeles", "Chicago", "San Francisco", 
  "Austin", "Seattle"
];

const categories = [
  "Pottery", "Cooking", "Baking", "Painting & Art", 
  "Candle Making", "Jewellery & Metal", "Cocktail & Wine", 
  "Photography", "Music & Dance", "Wood Craft", 
  "Textile Craft", "Paper Craft", "Flower & Plants"
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
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

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]] as [number, number]);
  };

  const SortIcon = sortOptions.find(option => option.value === sortBy)?.icon || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <Navigation />
      <main className="pt-24 pb-16 container-padding">
        <div className="max-w-5xl mx-auto">
          {/* Search Section */}
          <div className="glass-panel p-6 rounded-2xl shadow-sm mb-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">Find Your Perfect Class</h1>
            <div className="space-y-4">
              {/* Search and Location */}
              <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn?"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10 h-12 border-neutral-200"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="pl-10 h-12 border-neutral-200">
                      <SelectValue placeholder="Select location" />
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
                
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-8 bg-accent-purple hover:bg-accent-purple/90"
                >
                  Search
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Category
                  </h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-neutral-200">
                      <SelectValue placeholder="All Categories" />
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
                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-neutral-500"
                        )}
                      >
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

                {/* Sort Options */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <SortIcon className="w-4 h-4" />
                    Sort By
                  </h3>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="border-neutral-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                <h3 className="text-sm font-medium mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm text-neutral-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <ClassGrid 
            category={selectedCategory === "all" ? null : selectedCategory} 
            sortBy={sortBy}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
