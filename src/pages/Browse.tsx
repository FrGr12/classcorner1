import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import ClassGrid from "@/components/landing/ClassGrid";
import Footer from "@/components/landing/Footer";
import SearchBar from "@/components/landing/browse/SearchBar";
import FiltersSection from "@/components/landing/browse/FiltersSection";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

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
    setDate(undefined);
    handleSearch();
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <Navigation />
      <main className="pt-24 pb-16" role="main">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-4 sm:p-6 rounded-2xl shadow-sm mb-8 max-w-[1920px] mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Find Your Perfect Class</h1>
            <div className="space-y-4">
              <SearchBar 
                searchInput={searchInput}
                selectedCity={selectedCity}
                isLoading={isLoading}
                onSearchChange={setSearchInput}
                onCityChange={setSelectedCity}
                onSearch={handleSearch}
              />

              <FiltersSection 
                selectedCategory={selectedCategory}
                timeRange={timeRange}
                date={date}
                sortBy={sortBy}
                priceRange={priceRange}
                showCustomDate={showCustomDate}
                onCategoryChange={setSelectedCategory}
                onTimeRangeChange={handleTimeRangeChange}
                onDateChange={setDate}
                onSortChange={setSortBy}
                onPriceRangeChange={handlePriceRangeChange}
                onReset={handleReset}
              />
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
