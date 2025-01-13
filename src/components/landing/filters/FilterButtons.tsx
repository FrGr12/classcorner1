import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";

interface FilterButtonsProps {
  selectedCategories: string[];
  selectedLocation: string;
  selectedTime: string;
  setSelectedCategories: (categories: string[]) => void;
  setOpen: (open: boolean) => void;
  setSelectedLocation: (location: string) => void;
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

const FilterButtons = ({
  selectedCategories,
  selectedLocation,
  selectedTime,
  setSelectedCategories,
  setOpen,
  setSelectedLocation,
}: FilterButtonsProps) => {
  const [date, setDate] = useState<DateRange | undefined>();

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
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
            {selectedLocation}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] bg-white">
          {cities.map((city) => (
            <DropdownMenuItem
              key={city}
              onClick={() => setSelectedLocation(city)}
              className="cursor-pointer"
            >
              {city}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2"
          >
            <CalendarIcon className="w-4 h-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                </>
              ) : (
                format(date.from, "LLL dd")
              )
            ) : (
              "Anytime"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterButtons;
