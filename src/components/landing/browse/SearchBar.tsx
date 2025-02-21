
import { Search, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import SearchSuggestions from "./SearchSuggestions";
import SearchSuggestionsList from "./SearchSuggestionsList";
import { useDebounce } from "@/hooks/use-debounce";
import { cities, popularSearches, RECENT_SEARCHES_KEY, MAX_RECENT_SEARCHES } from "./constants";
import { searchClasses, highlightMatch } from "./utils";
import type { SearchBarProps } from "./types";

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

  useEffect(() => {
    if (debouncedSearchInput.trim()) {
      setIsLoadingSuggestions(true);
      setTimeout(() => {
        const { categories, titles } = searchClasses(debouncedSearchInput);
        setMatchingCategories(categories);
        setMatchingTitles(titles);
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
            <SearchSuggestionsList
              searchInput={searchInput}
              matchingCategories={matchingCategories}
              matchingTitles={matchingTitles}
              selectedSuggestionIndex={selectedSuggestionIndex}
              onSelectSearch={handleSelectSearch}
              highlightMatch={(text) => highlightMatch(text, searchInput)}
            />
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
