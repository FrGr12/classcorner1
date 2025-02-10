
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import ClassGrid from "@/components/landing/ClassGrid";
import Footer from "@/components/landing/Footer";
import { Search, MapPin, Calendar, Filter, Sparkles, TrendingUp, Clock, Star, X, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState(0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (selectedCity) params.set("city", selectedCity);
    if (date) params.set("date", date.toISOString());
    if (sortBy) params.set("sort", sortBy);
    setSearchParams(params);
    setIsSearchOpen(false);
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

  const SearchButton = () => (
    <button
      onClick={() => setIsSearchOpen(true)}
      className="w-full md:w-auto flex items-center gap-3 px-4 py-3.5 bg-white rounded-full border border-neutral-200 shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <Search className="w-4 h-4 text-neutral-500" />
      <span className="text-sm text-neutral-600">Search classes...</span>
    </button>
  );

  const SearchSheet = () => (
    <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <SheetContent side="top" className="h-[90vh] pt-16">
        <SheetHeader className="mb-8">
          <div className="absolute top-4 left-4">
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <SheetTitle className="text-2xl font-display">Find your next experience</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 px-2">
          {/* Search Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="What do you want to learn?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-medium mb-4">Popular Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(0, 6).map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="justify-start h-auto py-4"
                  onClick={() => {
                    setSelectedCategory(category);
                    handleSearch();
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Location Selection */}
          <div>
            <h3 className="font-medium mb-4">Location</h3>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a city" />
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

          {/* Date Selection */}
          <div>
            <h3 className="font-medium mb-4">When</h3>
            <Dialog open={isDateOpen} onOpenChange={setIsDateOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {date ? format(date, 'EEE, MMM d') : 'Choose a date'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select a date</DialogTitle>
                </DialogHeader>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setIsDateOpen(false);
                  }}
                  initialFocus
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 200]}
                max={200}
                step={10}
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                className="mt-6"
              />
              <div className="flex justify-between mt-2 text-sm text-neutral-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-accent-purple hover:bg-accent-purple/90"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-4xl mx-auto mb-12">
          <SearchButton />
          <SearchSheet />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr]">
          <div>
            {/* Active Filters Display */}
            {(selectedCategory !== "all" || selectedCity || date || sortBy !== "recommended") && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className="rounded-full"
                  >
                    {selectedCategory}
                    <X className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {selectedCity && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedCity("")}
                    className="rounded-full"
                  >
                    {selectedCity}
                    <X className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {date && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setDate(undefined)}
                    className="rounded-full"
                  >
                    {format(date, 'MMM d')}
                    <X className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {sortBy !== "recommended" && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSortBy("recommended")}
                    className="rounded-full"
                  >
                    {sortOptions.find(opt => opt.value === sortBy)?.label}
                    <X className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}

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
