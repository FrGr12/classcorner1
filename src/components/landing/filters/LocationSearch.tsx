import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";

interface LocationSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setSelectedLocation: (location: string) => void;
  cities: string[];
}

const LocationSearch = ({
  open,
  onOpenChange,
  setSelectedLocation,
  cities,
}: LocationSearchProps) => {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search locations..." 
            className="h-11 flex-1 bg-transparent outline-none placeholder:text-neutral-500 focus:outline-none focus:ring-0 border-0"
          />
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggested locations">
            {cities.map((city) => (
              <CommandItem
                key={city}
                onSelect={(value) => {
                  setSelectedLocation(value);
                  onOpenChange(false);
                }}
              >
                {city}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default LocationSearch;