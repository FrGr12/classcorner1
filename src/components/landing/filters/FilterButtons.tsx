import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addMonths } from "date-fns";
import { useState } from "react";

const categories = [
  "Pottery",
  "Cooking",
  "Baking",
  "Painting & Art",
  "Cocktail & Wine",
  "Photography",
  "Music & Dance",
  "Candle Making",
  "Wood Craft",
  "Jewellery & Metal Craft",
  "Textile Craft",
  "Paper Craft",
  "Flower & Plants",
];

const cities = [
  "Everywhere",
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
  "Jönköping",
  "Norrköping",
];

const timeRanges = [
  { label: "This week", getValue: () => ({ from: startOfWeek(new Date()), to: endOfWeek(new Date()) }) },
  { label: "This month", getValue: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { label: "Next month", getValue: () => {
    const nextMonth = addMonths(new Date(), 1);
    return { from: startOfMonth(nextMonth), to: endOfMonth(nextMonth) };
  }},
];

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  const handleLocationChange = (location: string) => {
    if (location === "Everywhere") {
      setSelectedLocations(["Everywhere"]);
      return;
    }
    
    setSelectedLocations((prevLocations: string[]) => {
      const newLocations = prevLocations.includes(location)
        ? prevLocations.filter((l) => l !== location)
        : [...prevLocations.filter((l) => l !== "Everywhere"), location];
      
      return newLocations.length === 0 ? ["Everywhere"] : newLocations;
    });
  };

  const handleTimeRangeSelect = (label: string, range?: DateRange) => {
    setSelectedTimeRange(label);
    setDate(range);
  };

  return (
    <div className="grid grid-cols-3 gap-1 mb-8 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full rounded-full flex items-center justify-center gap-1 h-8 px-1.5 text-[10px] sm:text-sm sm:h-9 sm:px-4 sm:gap-2"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">
              {selectedCategories.length === 0
                ? "All"
                : `${selectedCategories.length}`}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] bg-white">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
              className="cursor-pointer"
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full rounded-full flex items-center justify-center gap-1 h-8 px-1.5 text-[10px] sm:text-sm sm:h-9 sm:px-4 sm:gap-2"
          >
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">
              {selectedLocations.includes("Everywhere")
                ? "All"
                : selectedLocations.length === 1
                ? selectedLocations[0]
                : `${selectedLocations.length}`}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] bg-white">
          {cities.map((city) => (
            <DropdownMenuCheckboxItem
              key={city}
              checked={selectedLocations.includes(city)}
              onCheckedChange={() => handleLocationChange(city)}
              className="cursor-pointer"
            >
              {city}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full rounded-full flex items-center justify-center gap-1 h-8 px-1.5 text-[10px] sm:text-sm sm:h-9 sm:px-4 sm:gap-2"
          >
            <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{selectedTimeRange}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] bg-white">
          <DropdownMenuItem
            onClick={() => handleTimeRangeSelect("Anytime", undefined)}
          >
            Anytime
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {timeRanges.map((range) => (
            <DropdownMenuItem
              key={range.label}
              onClick={() => handleTimeRangeSelect(range.label, range.getValue())}
            >
              {range.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                Specific dates
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={new Date()}
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  if (newDate?.from) {
                    setSelectedTimeRange(
                      newDate.to
                        ? `${format(newDate.from, "MMM d")} - ${format(
                            newDate.to,
                            "MMM d"
                          )}`
                        : format(newDate.from, "MMM d")
                    );
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterButtons;
