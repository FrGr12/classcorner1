import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import ClassGrid from "@/components/landing/ClassGrid";
import Footer from "@/components/landing/Footer";
import { Search, MapPin, Calendar, Filter, Sparkles, TrendingUp, Clock, Star, ChevronDown } from "lucide-react";
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
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays } from "date-fns";
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
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : undefined
  );
  const [dateRange, setDateRange] = useState<string>("any");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 200
  ]);
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating")) || 0);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);
  const debouncedPriceRange = useDebounce(priceRange, 300);
  const debouncedMinRating = useDebounce(minRating, 300);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    let newDate: Date | undefined;
    
    switch (value) {
      case "any":
        newDate = undefined;
        break;
      case "this-week":
        newDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        break;
      case "next-week":
        newDate = startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 });
        break;
      case "this-month":
        newDate = startOfMonth(new Date());
        break;
      case "next-month":
        newDate = startOfMonth(addDays(new Date(), 30));
        break;
      default:
        newDate = date;
    }
    
    setDate(newDate);
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch, debouncedPriceRange, debouncedMinRating]);

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
    setDate(undefined);
    setDateRange("any");
    setPriceRange([0, 200]);
    setMinRating(0);
    setSearchParams({});
  };

  const getDateButtonText = () => {
    if (date) {
      return format(date, 'EEE, MMM d');
    }
    switch (dateRange) {
      case "any":
        return "Any date";
      case "this-week":
        return "This week";
      case "next-week":
        return "Next week";
      case "this-month":
        return "This month";
      case "next-month":
        return "Next month";
      default:
        return "Select dates";
    }
  };

  const SortIcon = sortOptions.find(option => option.value === sortBy)?.icon || Sparkles;

  const formatPrice = (value: number) => `$${value}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <Navigation />
      <main className="pt-24 pb-16" role="main">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-6 rounded-2xl shadow-sm mb-8 max-w-[1920px] mx-auto">
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
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="pl-10 h-12 border-neutral-200" aria-label="Select city">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Category
                  </h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-neutral-200">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full justify-between text-left font-normal",
                          !date && !dateRange && "text-neutral-500"
                        )}
                      >
                        <span>{getDateButtonText()}</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4 bg-white border rounded-md shadow-md" align="start">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={dateRange === "any" ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleDateRangeChange("any")}
                          >
                            Any date
                          </Button>
                          <Button
                            variant={dateRange === "this-week" ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleDateRangeChange("this-week")}
                          >
                            This week
                          </Button>
                          <Button
                            variant={dateRange === "next-week" ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleDateRangeChange("next-week")}
                          >
                            Next week
                          </Button>
                          <Button
                            variant={dateRange === "this-month" ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleDateRangeChange("this-month")}
                          >
                            This month
                          </Button>
                        </div>
                        <div className="border-t pt-4">
                          <p className="text-sm text-neutral-500 mb-2">Or pick a specific date</p>
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              setDate(newDate);
                              setDateRange("specific");
                              handleSearch(newDate);
                            }}
                            initialFocus
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <span className="w-4 h-4 text-accent-purple">$</span>
                      Price Range
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 200]}
                      max={200}
                      step={5}
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      className="mt-2"
                      aria-label="Price range"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-neutral-500">$0</span>
                      <span className="text-xs text-neutral-500">$200+</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <SortIcon className="w-4 h-4" />
                    Sort By
                  </h3>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="border-neutral-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
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

              <div className="flex justify-end max-w-5xl mx-auto">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset}
                  className="text-xs text-neutral-500 hover:text-accent-purple"
                  aria-label="Reset all filters"
                >
                  Reset Filters
                </Button>
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
