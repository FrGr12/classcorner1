
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SearchSuggestions from "./SearchSuggestions";

interface SearchBarProps {
  searchInput: string;
  selectedCity: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onSearch: () => void;
}

const cities = [
  "New York", "Los Angeles", "Chicago", "San Francisco", 
  "Austin", "Seattle"
];

const popularSearches = [
  "Pottery for beginners",
  "Cooking classes near me",
  "Weekend art workshops",
  "Photography basics",
  "Candle making"
];

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

const SearchBar = ({
  searchInput,
  selectedCity,
  isLoading,
  onSearchChange,
  onCityChange,
  onSearch
}: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    
    const newRecentSearches = [
      searchInput,
      ...recentSearches.filter(s => s !== searchInput)
    ].slice(0, MAX_RECENT_SEARCHES);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecentSearches));
    
    onSearch();
    setShowSuggestions(false);
  };

  const handleSelectSearch = (search: string) => {
    onSearchChange(search);
    setShowSuggestions(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-3 max-w-5xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="What do you want to learn?"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 h-12 border-neutral-200"
          aria-label="Search classes"
        />
        {showSuggestions && (searchInput.length === 0) && (
          <SearchSuggestions
            recentSearches={recentSearches}
            popularSearches={popularSearches}
            onSelectSearch={handleSelectSearch}
          />
        )}
      </div>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
        <Select value={selectedCity} onValueChange={onCityChange}>
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
  );
};

export default SearchBar;
