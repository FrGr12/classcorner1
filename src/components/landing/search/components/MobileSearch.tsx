
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import FilterButtons from "../../filters/FilterButtons";
import { SearchSuggestions } from "./SearchSuggestions";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
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

export const MobileSearch = ({
  isOpen,
  setIsOpen,
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
}: MobileSearchProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="md:hidden w-full">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="w-full">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <Search className="w-4 h-4 text-neutral-500" />
            <span className="text-sm text-neutral-600">{t("search.placeholder")}</span>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-lg font-semibold">{t("search.title")}</SheetTitle>
          </SheetHeader>
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("search.placeholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="w-full pl-10 py-6 text-base"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
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
              className="w-full py-3 bg-accent-rose text-accent-purple rounded-xl font-medium hover:bg-accent-rose/90 transition-colors"
            >
              {t("search.button")}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
