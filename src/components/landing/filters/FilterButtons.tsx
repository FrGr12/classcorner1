
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(selectedTime || "Anytime");
  const debouncedCategories = useDebounce(selectedCategories, 300);
  const debouncedLocations = useDebounce(selectedLocations, 300);
  const debouncedTimeRange = useDebounce(selectedTimeRange, 300);

  // Sync URL parameters with filter state
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    // Update categories in URL
    if (debouncedCategories.length > 0) {
      params.set('categories', debouncedCategories.join(','));
    } else {
      params.delete('categories');
    }

    // Update locations in URL
    if (debouncedLocations.length > 0 && !debouncedLocations.includes("Everywhere")) {
      params.set('locations', debouncedLocations.join(','));
    } else {
      params.delete('locations');
    }

    // Update time range in URL
    if (debouncedTimeRange !== "Anytime") {
      params.set('timeRange', debouncedTimeRange);
    } else {
      params.delete('timeRange');
    }

    // Update date range in URL if selected
    if (date?.from) {
      params.set('dateFrom', date.from.toISOString());
      if (date.to) {
        params.set('dateTo', date.to.toISOString());
      } else {
        params.delete('dateTo');
      }
    } else {
      params.delete('dateFrom');
      params.delete('dateTo');
    }

    setSearchParams(params, { replace: true });
  }, [debouncedCategories, debouncedLocations, debouncedTimeRange, date, searchParams, setSearchParams]);

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoriesParam = searchParams.get('categories');
    const locationsParam = searchParams.get('locations');
    const timeRangeParam = searchParams.get('timeRange');
    const dateFromParam = searchParams.get('dateFrom');
    const dateToParam = searchParams.get('dateTo');

    if (categoriesParam) {
      const categories = categoriesParam.split(',');
      setSelectedCategories(categories);
    }

    if (locationsParam) {
      const locations = locationsParam.split(',');
      setSelectedLocations(locations);
    }

    if (timeRangeParam) {
      setSelectedTimeRange(timeRangeParam);
    }

    if (dateFromParam) {
      const dateRange: DateRange = {
        from: new Date(dateFromParam),
        to: dateToParam ? new Date(dateToParam) : undefined
      };
      setDate(dateRange);
    }
  }, [searchParams, setSelectedCategories, setSelectedLocations]);

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    if (range === "Anytime") {
      setDate(undefined);
    }
  };

  const handleDateChange = (newDate: DateRange | undefined) => {
    try {
      setDate(newDate);
      if (newDate?.from) {
        setSelectedTimeRange("Custom");
      }
    } catch (error) {
      toast.error("Invalid date selection");
    }
  };

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
        setSelectedTimeRange={handleTimeRangeChange}
        date={date}
        setDate={handleDateChange}
      />
    </div>
  );
};

export default FilterButtons;
