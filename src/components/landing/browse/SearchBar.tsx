
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
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
  const [matchingCategories, setMatchingCategories] = useState<string[]>([]);
  const [matchingTitles, setMatchingTitles] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Search suggestions logic
  useEffect(() => {
    if (searchInput.trim()) {
      // Get all class titles from mockClasses
      const allTitles = new Set<string>();
      const allCategories = new Set<string>();
      
      Object.entries(mockClasses).forEach(([category, classes]) => {
        if (category.toLowerCase().includes(searchInput.toLowerCase())) {
          allCategories.add(category);
        }
        
        classes.forEach(classItem => {
          if (classItem.title.toLowerCase().includes(searchInput.toLowerCase())) {
            allTitles.add(classItem.title);
          }
        });
      });

      setMatchingCategories(Array.from(allCategories));
      setMatchingTitles(Array.from(allTitles).slice(0, 5)); // Limit to 5 suggestions
    } else {
      setMatchingCategories([]);
      setMatchingTitles([]);
    }
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-3 max-w-5xl mx-auto">
      <div className="relative" ref={searchContainerRef}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="What do you want to learn?"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 h-12 border-neutral-200"
          aria-label="Search classes"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
          aria-haspopup="listbox"
        />
        {showSuggestions && (
          searchInput.length === 0 ? (
            <SearchSuggestions
              recentSearches={recentSearches}
              popularSearches={popularSearches}
              onSelectSearch={handleSelectSearch}
            />
          ) : (matchingCategories.length > 0 || matchingTitles.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-200 p-2 z-50">
              {matchingCategories.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-neutral-500 px-3 mb-2">Categories</h3>
                  {matchingCategories.map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className="w-full justify-start text-left text-neutral-700 hover:text-accent-purple hover:bg-neutral-50"
                      onClick={() => handleSelectSearch(category)}
                    >
                      <Search className="w-4 h-4 mr-2 text-neutral-400" />
                      {category}
                    </Button>
                  ))}
                </div>
              )}
              {matchingTitles.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 px-3 mb-2">Classes</h3>
                  {matchingTitles.map((title) => (
                    <Button
                      key={title}
                      variant="ghost"
                      className="w-full justify-start text-left text-neutral-700 hover:text-accent-purple hover:bg-neutral-50"
                      onClick={() => handleSelectSearch(title)}
                    >
                      <Search className="w-4 h-4 mr-2 text-neutral-400" />
                      {title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )
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
