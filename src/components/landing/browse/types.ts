
export interface SearchBarProps {
  searchInput: string;
  selectedCity: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onSearch: () => void;
}

export interface SuggestionsProps {
  searchInput: string;
  matchingCategories: string[];
  matchingTitles: string[];
  selectedSuggestionIndex: number;
  onSelectSearch: (search: string) => void;
  highlightMatch: (text: string) => React.ReactNode;
}
