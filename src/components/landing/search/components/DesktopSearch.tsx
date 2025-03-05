
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FilterButtons from "../../filters/FilterButtons";
import { SearchSuggestions } from "./SearchSuggestions";
import { useLanguage } from "@/contexts/LanguageContext";

interface DesktopSearchProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedLocations: string[];
  selectedTime: string;
  setSelectedLocations: (locations: string[]) => void;
  handleSearch: () => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoadingPreferences: boolean;
  userPreferences?: {
    interests: string[];
    preferred_location: string | null;
  };
  matchingCategories: string[];
  matchingTitles: string[];
}

export const DesktopSearch = ({
  searchInput,
  setSearchInput,
  selectedCategories,
  setSelectedCategories,
  selectedLocations,
  selectedTime,
  setSelectedLocations,
  handleSearch,
  handleInputKeyDown,
  isLoadingPreferences,
  userPreferences,
  matchingCategories,
  matchingTitles,
}: DesktopSearchProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="hidden md:block w-full">
      <div className="glass-panel rounded-full flex items-center divide-x divide-neutral-200 p-2">
        <div className="flex-1 px-4 py-2 relative">
          <Input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="border-0 bg-transparent focus-visible:ring-0 px-0 py-0 h-auto placeholder:text-neutral-500"
          />
          <SearchSuggestions
            isLoadingPreferences={isLoadingPreferences}
            userPreferences={userPreferences}
            matchingCategories={matchingCategories}
            matchingTitles={matchingTitles}
            onCategorySelect={(category) => {
              setSelectedCategories([category]);
              setSearchInput(category);
              handleSearch();
            }}
            onTitleSelect={(title) => {
              setSearchInput(title);
              handleSearch();
            }}
          />
        </div>

        <FilterButtons
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLocations={selectedLocations}
          selectedTime={selectedTime}
          setOpen={() => {}}
          setSelectedLocations={setSelectedLocations}
        />

        <button 
          onClick={handleSearch}
          className="ml-2 p-3 bg-accent-purple text-white rounded-full hover:bg-accent-lavender transition-colors"
          aria-label={t("search.button")}
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
