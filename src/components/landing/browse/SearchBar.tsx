
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

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

const SearchBar = ({
  searchInput,
  selectedCity,
  isLoading,
  onSearchChange,
  onCityChange,
  onSearch
}: SearchBarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-3 max-w-5xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="What do you want to learn?"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 border-neutral-200"
          aria-label="Search classes"
        />
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
        onClick={onSearch}
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
