
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SuggestionsProps } from "./types";

const SearchSuggestionsList = ({
  searchInput,
  matchingCategories,
  matchingTitles,
  selectedSuggestionIndex,
  onSelectSearch,
  highlightMatch
}: SuggestionsProps) => {
  return (
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
              onClick={() => onSelectSearch(category)}
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
              onClick={() => onSelectSearch(title)}
            >
              <Search className="w-4 h-4 mr-2 text-neutral-400" />
              {highlightMatch(title)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestionsList;
