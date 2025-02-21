
import { Clock, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchSuggestionsProps {
  recentSearches: string[];
  popularSearches: string[];
  onSelectSearch: (search: string) => void;
}

const SearchSuggestions = ({
  recentSearches,
  popularSearches,
  onSelectSearch
}: SearchSuggestionsProps) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-200 p-2 z-50">
      {recentSearches.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-neutral-500 px-3 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Searches
          </h3>
          <div className="space-y-1">
            {recentSearches.map((search) => (
              <Button
                key={search}
                variant="ghost"
                className="w-full justify-start text-left text-neutral-700 hover:text-accent-purple hover:bg-neutral-50"
                onClick={() => onSelectSearch(search)}
              >
                <Search className="w-4 h-4 mr-2 text-neutral-400" />
                {search}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-neutral-500 px-3 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Popular Searches
        </h3>
        <div className="space-y-1">
          {popularSearches.map((search) => (
            <Button
              key={search}
              variant="ghost"
              className="w-full justify-start text-left text-neutral-700 hover:text-accent-purple hover:bg-neutral-50"
              onClick={() => onSelectSearch(search)}
            >
              <Search className="w-4 h-4 mr-2 text-neutral-400" />
              {search}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
