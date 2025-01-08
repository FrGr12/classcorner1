import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import ClassGrid from "@/components/landing/ClassGrid";
import Footer from "@/components/landing/Footer";
import { Search, MapPin, Calendar, Star } from "lucide-react";
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

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Austin",
  "Seattle",
];

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("featured");
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
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
            
            <button 
              className="button-primary rounded-full whitespace-nowrap"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <div className="flex flex-wrap gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-neutral-200 bg-white"
            >
              <option value="featured">Featured Classes</option>
              <option value="Ceramics">Ceramics</option>
              <option value="Painting">Painting</option>
              <option value="Cooking">Cooking</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Filter */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
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

            {/* City Filter */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                City
              </h3>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
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

            {/* Rating Filter */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Minimum Rating
              </h3>
              <Select 
                value={minRating.toString()} 
                onValueChange={(value) => setMinRating(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum rating" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating === 0 ? 'Any rating' : `${rating}+ stars`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <ClassGrid category={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;