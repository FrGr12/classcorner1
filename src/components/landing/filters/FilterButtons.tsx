import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin } from "lucide-react";

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
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button
        variant="outline"
        className={cn(
          "rounded-full",
          !selectedCategory && "bg-accent-purple text-white hover:bg-accent-purple/90"
        )}
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
        <DropdownMenuContent align="start" className="w-[200px]">
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

      <Button
        variant="outline"
        className="rounded-full"
      >
        {selectedTime}
      </Button>
    </div>
  );
};

export default FilterButtons;