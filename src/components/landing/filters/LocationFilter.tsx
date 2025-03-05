import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationFilterProps {
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
}

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

const LocationFilter = ({ selectedLocations, setSelectedLocations }: LocationFilterProps) => {
  const handleLocationChange = (location: string) => {
    if (location === "Everywhere") {
      setSelectedLocations(["Everywhere"]);
    } else {
      const newLocations = selectedLocations.includes(location)
        ? selectedLocations.filter((l) => l !== location)
        : [...selectedLocations.filter((l) => l !== "Everywhere"), location];
      
      setSelectedLocations(newLocations.length === 0 ? ["Everywhere"] : newLocations);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 px-5 text-sm rounded-none border-x-0"
        >
          <MapPin className="w-4 h-4 mr-2" />
          {selectedLocations.includes("Everywhere")
            ? "All"
            : selectedLocations.length === 1
            ? selectedLocations[0]
            : `${selectedLocations.length}`}
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
  );
};

export default LocationFilter;
