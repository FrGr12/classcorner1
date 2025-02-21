
import { Search, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import SearchSuggestions from "./SearchSuggestions";
import { mockClasses } from "@/data/mockClasses";
import type { ClassItem } from "@/types/class";
import { useDebounce } from "@/hooks/use-debounce";

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
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debouncedSearchInput = useDebounce(searchInput, 300);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Search suggestions logic with debounce
  useEffect(() => {
    if (debouncedSearchInput.trim()) {
      setIsLoadingSuggestions(true);
      // Simulate network delay for demo purposes
      setTimeout(() => {
        const allTitles = new Set<string>();
        const allCategories = new Set<string>();
        
        Object.entries(mockClasses).forEach(([category, classes]: [string, ClassItem[]]) => {
          if (category.toLowerCase().includes(debouncedSearchInput.toLowerCase())) {
            allCategories.add(category);
          }
          
          classes.forEach(classItem => {
            if (classItem.title.toLowerCase().includes(debouncedSearchInput.toLowerCase())) {
              allTitles.add(classItem.title);
            }
          });
        });

        setMatchingCategories(Array.from(allCategories));
        setMatchingTitles(Array.from(allTitles).slice(0, 5));
        setIsLoadingSuggestions(false);
      }, 300);
    } else {
      setMatchingCategories([]);
      setMatchingTitles([]);
      setIsLoadingSuggestions(false);
    }
  }, [debouncedSearchInput]);

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
    const suggestions = [...matchingCategories, ...matchingTitles];
    
    switch (e.key) {
      case 'Enter':
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSelectSearch(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : -1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > -1 ? prev - 1 : suggestions.length - 1
        );
        break;
    }
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
  };

  const highlightMatch = (text: string) => {
    if (!searchInput) return text;
    const regex = new RegExp(`(${searchInput})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? 
            <span key={i} className="bg-accent-purple/10 text-accent-purple">{part}</span> : 
            part
        )}
      </span>
    );
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
          className="pl-10 pr-10 h-12 border-neutral-200"
          aria-label="Search classes"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
          aria-haspopup="listbox"
          aria-activedescendant={selectedSuggestionIndex >= 0 ? `suggestion-${selectedSuggestionIndex}` : undefined}
          role="combobox"
        />
        {searchInput && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {showSuggestions && (
          searchInput.length === 0 ? (
            <SearchSuggestions
              recentSearches={recentSearches}
              popularSearches={popularSearches}
              onSelectSearch={handleSelectSearch}
            />
          ) : isLoadingSuggestions ? (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 z-50 text-center text-neutral-500">
              Searching...
            </div>
          ) : (matchingCategories.length > 0 || matchingTitles.length > 0) ? (
            <div 
              className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-200 p-2 z-50"
              role="listbox"
              id="search-suggestions"
            >
              {matchingCategories.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-neutral-500 px-3 mb-2">Categories</h3>
                  {matchingCategories.map((category, index) => (
                    <Button
                      key={category}
                      id={`suggestion-${index}`}
                      role="option"
                      aria-selected={selectedSuggestionIndex === index}
                      variant="ghost"
                      className={`w-full justify-start text-left text-neutral-700 hover:text-accent-purple hover:bg-neutral-50 ${
                        selectedSuggestionIndex === index ? 'bg-neutral-50 text-accent-purple' : ''
                      }`}
                      onClick={() => handleSelectSearch(category)}
                    >
                      <Search className="w-4 h-4 mr-2 text-neutral-400" />
                      {highlightMatch(category)}
                    </Button>
                  ))}
                </div>
              )}
              {matchingTitles.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 px-3 mb-2">Classes</h3>
                  {matchingTitles.map((title, index) => (
                    <Button
                      key={title}
                      id={`suggestion-${index + matchingCategories.length}`}
                      role="option"
                      aria-selected={selectedSuggestionIndex === index + matchingCategories.length}
                      variant="ghost"
                      className={`w-full justify-start text-left text-neutral-700 hover:text-accent-purple hover:bg-neutral-50 ${
                        selectedSuggestionIndex === index + matchingCategories.length ? 'bg-neutral-50 text-accent-purple' : ''
                      }`}
                      onClick={() => handleSelectSearch(title)}
                    >
                      <Search className="w-4 h-4 mr-2 text-neutral-400" />
                      {highlightMatch(title)}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ) : searchInput.trim() ? (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 z-50 text-center text-neutral-500">
              No results found
            </div>
          ) : null
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
