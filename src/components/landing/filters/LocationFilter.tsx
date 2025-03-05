
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationFilterProps {
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
}

const LocationFilter = ({ selectedLocations, setSelectedLocations }: LocationFilterProps) => {
  const { t } = useLanguage();
  
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
            ? t('locations.all')
            : selectedLocations.length === 1
            ? t(`locations.${selectedLocations[0].toLowerCase()}`)
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
            {t(`locations.${city.toLowerCase()}`)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationFilter;
