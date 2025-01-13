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

interface FilterButtonsProps {
  selectedCategories: string[];
  selectedLocations: string[];
  selectedTime: string;
  setSelectedCategories: (categories: string[]) => void;
  setOpen: (open: boolean) => void;
  setSelectedLocations: (locations: string[]) => void;
}

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
    setSelectedLocations((prev) => {
      if (location === "Everywhere") {
        return ["Everywhere"];
      }
      
      const newLocations = prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev.filter((l) => l !== "Everywhere"), location];
      
      return newLocations.length === 0 ? ["Everywhere"] : newLocations;
    });
  };

  const handleTimeRangeSelect = (label: string, range?: DateRange) => {
    setSelectedTimeRange(label);
    setDate(range);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {selectedCategories.length === 0
              ? "All classes"
              : `${selectedCategories.length} selected`}
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
          <Button variant="outline" className="rounded-full flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {selectedLocations.includes("Everywhere")
              ? "Everywhere"
              : selectedLocations.length === 1
              ? selectedLocations[0]
              : `${selectedLocations.length} locations`}
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
          <Button variant="outline" className="rounded-full flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            {selectedTimeRange}
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
