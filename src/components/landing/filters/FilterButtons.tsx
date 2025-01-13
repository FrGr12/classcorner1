interface FilterButtonsProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLocations: string[];
  selectedTime: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterButtons = ({
  selectedCategories,
  setSelectedCategories,
  selectedLocations,
  selectedTime,
  setOpen,
  setSelectedLocations,
}: FilterButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => setSelectedCategories([])} 
        className="filter-button"
      >
        Clear Filters
      </button>
      <button 
        onClick={() => setOpen(true)} 
        className="filter-button"
      >
        Location
      </button>
    </div>
  );
};

export default FilterButtons;