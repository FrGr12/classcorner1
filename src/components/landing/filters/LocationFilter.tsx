import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
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
      return;
    }
    
    const newLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations.filter((l) => l !== "Everywhere"), location];
    
    setSelectedLocations(newLocations.length === 0 ? ["Everywhere"] : newLocations);
  };

  return (
    <DropdownMenu>
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