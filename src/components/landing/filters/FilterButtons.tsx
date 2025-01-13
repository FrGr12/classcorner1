import { useState } from "react";

interface FilterButtonsProps {
  onFilterChange: (filters: string[]) => void;
}

const FilterButtons = ({ onFilterChange }: FilterButtonsProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilters((prev: string[]) => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      }
      return [...prev, filter];
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
  };

  return (
    <div className="flex space-x-2">
      <button onClick={() => handleFilterClick("Beginner")} className={`filter-button ${selectedFilters.includes("Beginner") ? "active" : ""}`}>
        Beginner
      </button>
      <button onClick={() => handleFilterClick("Intermediate")} className={`filter-button ${selectedFilters.includes("Intermediate") ? "active" : ""}`}>
        Intermediate
      </button>
      <button onClick={() => handleFilterClick("Advanced")} className={`filter-button ${selectedFilters.includes("Advanced") ? "active" : ""}`}>
        Advanced
      </button>
      <button onClick={handleApplyFilters} className="apply-filters-button">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterButtons;
