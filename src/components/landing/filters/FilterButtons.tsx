import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";

interface FilterButtonsProps {
  selectedCategory: string | null;
  selectedLocation: string;
  selectedTime: string;
  setSelectedCategory: (category: string | null) => void;
  setOpen: (open: boolean) => void;
  setSelectedLocation: (location: string) => void;
}

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
  selectedCategory,
  selectedLocation,
  selectedTime,
  setSelectedCategory,
  setOpen,
  setSelectedLocation,
}: FilterButtonsProps) => {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button
        variant="outline"
        className={cn("rounded-full", {
          "bg-primary text-primary-foreground": !selectedCategory,
        })}
        onClick={() => setSelectedCategory(null)}
      >
        All classes
      </Button>

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