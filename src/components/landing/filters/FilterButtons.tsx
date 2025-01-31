import { useState } from "react";
import { DateRange } from "react-day-picker";
import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";
import DateFilter from "./DateFilter";

interface FilterButtonsProps {
  selectedCategories: string[];
  selectedLocations: string[];
  selectedTime: string;
  setSelectedCategories: (categories: string[]) => void;
  setOpen: (open: boolean) => void;
  setSelectedLocations: (locations: string[]) => void;
}

const FilterButtons = ({
  selectedCategories,
  selectedLocations,
  selectedTime,
  setSelectedCategories,
  setOpen,
  setSelectedLocations,
}: FilterButtonsProps) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("Anytime");

  return (
    <div className="inline-flex rounded-lg shadow-sm">
      <CategoryFilter 
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <LocationFilter 
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
      />
      <DateFilter 
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        date={date}
        setDate={setDate}
      />
    </div>
  );
};

export default FilterButtons;