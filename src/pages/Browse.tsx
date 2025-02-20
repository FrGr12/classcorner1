
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
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

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

const timeRanges = [
  { label: "All Dates", value: "all" },
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "Custom Date", value: "custom" },
];

const sortOptions = [
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Top Rated", value: "top-rated", icon: Star },
  { label: "Last Minute Deals", value: "last-minute", icon: Clock },
  { label: "This Week", value: "this-week", icon: Calendar },
  { label: "Recommended", value: "recommended", icon: Sparkles },
];

const Browse = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "recommended");
  const [timeRange, setTimeRange] = useState(searchParams.get("timeRange") || "all");
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : undefined
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 200
  ]);
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating")) || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);
  const debouncedPriceRange = useDebounce(priceRange, 300);
  const debouncedMinRating = useDebounce(minRating, 300);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch, debouncedPriceRange, debouncedMinRating]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    if (value === "custom") {
      setShowCustomDate(true);
      return;
    }
    setShowCustomDate(false);
    
    let newDate: Date | undefined;
    switch (value) {
      case "this-week":
        newDate = startOfWeek(new Date());
        break;
      case "this-month":
        newDate = startOfMonth(new Date());
        break;
      default:
        newDate = undefined;
    }
    setDate(newDate);
    handleSearch();
  };

  const handleSearch = () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams);
      
      if (searchInput) params.set("q", searchInput);
      else params.delete("q");
      
      if (selectedCity) params.set("city", selectedCity);
      else params.delete("city");
      
      if (date) params.set("date", date.toISOString());
      else params.delete("date");
      
      if (timeRange !== "all") params.set("timeRange", timeRange);
      else params.delete("timeRange");
      
      if (sortBy) params.set("sort", sortBy);
      else params.delete("sort");
      
      if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
      else params.delete("minPrice");
      
      if (priceRange[1] < 200) params.set("maxPrice", priceRange[1].toString());
      else params.delete("maxPrice");
      
      if (minRating > 0) params.set("minRating", minRating.toString());
      else params.delete("minRating");

      setSearchParams(params, { replace: true });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: "There was an error updating your search. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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

  const handleReset = () => {
    setSelectedCategory("all");
    setSearchInput("");
    setSelectedCity("");
    setSortBy("recommended");
    setTimeRange("all");
    setDate(undefined);
    setPriceRange([0, 200]);
    setMinRating(0);
    setSearchParams({});
  };

  const SortIcon = sortOptions.find(option => option.value === sortBy)?.icon || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <Navigation />
      <main className="pt-24 pb-16" role="main">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-4 sm:p-6 rounded-2xl shadow-sm mb-8 max-w-[1920px] mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Find Your Perfect Class</h1>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-3 max-w-5xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn?"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10 h-12 border-neutral-200"
                    aria-label="Search classes"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="pl-10 h-12 border-neutral-200" aria-label="Select city">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
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
                  disabled={isLoading}
                  aria-label="Search"
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr,1fr] gap-4 max-w-5xl mx-auto">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Category
                  </h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-neutral-200">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </h3>
                  <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                    <SelectTrigger className="border-neutral-200">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {timeRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {showCustomDate && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className={cn(
                            "w-full justify-start text-left font-normal border-neutral-200 mt-2",
                            !date && "text-neutral-500"
                          )}
                        >
                          {date ? format(date, 'EEE, MMM d') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <SortIcon className="w-4 h-4" />
                      Sort & Price
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleReset}
                      className="text-xs text-neutral-500 hover:text-accent-purple"
                      aria-label="Reset all filters"
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="border-neutral-200">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
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
                    
                    <div>
                      <div className="flex justify-between text-sm text-neutral-600 mb-1">
                        <span>Price Range</span>
                        <span>${priceRange[0]} - ${priceRange[1]}</span>
                      </div>
                      <Slider
                        defaultValue={[0, 200]}
                        max={200}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceRangeChange}
                        className="mt-2"
                        aria-label="Price range"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1920px] mx-auto">
            <ClassGrid 
              category={selectedCategory === "all" ? null : selectedCategory} 
              sortBy={sortBy}
              priceRange={priceRange}
              minRating={minRating}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
