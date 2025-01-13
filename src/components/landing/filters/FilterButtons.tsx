import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";
import TimeFilter from "./TimeFilter";

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
    <div className="grid grid-cols-3 gap-1 mb-8 w-full">
      <CategoryFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <LocationFilter
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
      />
      
      <TimeFilter
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        date={date}
        setDate={setDate}
      />
    </div>
  );
};

export default FilterButtons;