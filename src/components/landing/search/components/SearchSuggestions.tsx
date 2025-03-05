
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface SearchSuggestionsProps {
  isLoadingPreferences: boolean;
  userPreferences?: {
    interests: string[];
    preferred_location: string | null;
  };
  matchingCategories: string[];
  matchingTitles: string[];
  onCategorySelect: (category: string) => void;
  onTitleSelect: (title: string) => void;
}

export const SearchSuggestions = ({
  isLoadingPreferences,
  userPreferences,
  matchingCategories,
  matchingTitles,
  onCategorySelect,
  onTitleSelect
}: SearchSuggestionsProps) => {
  return (
    <>
      {!isLoadingPreferences && userPreferences?.interests?.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-neutral-600 mb-2">Your Interests:</p>
          <div className="flex flex-wrap gap-2">
            {userPreferences.interests.map(interest => (
              <Badge key={interest} variant="secondary" className="gap-1">
                <Star className="w-3 h-3" />
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {(matchingCategories.length > 0 || matchingTitles.length > 0) && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {matchingCategories.map((category) => (
            <div
              key={category}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onCategorySelect(category)}
            >
              <span className="text-accent-purple">Category:</span> {category}
            </div>
          ))}
          {matchingTitles.map((title) => (
            <div
              key={title}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onTitleSelect(title)}
            >
              <span className="text-accent-purple">Class:</span> {title}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
