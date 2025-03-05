
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cities } from "../browse/constants";

interface LocationFilterProps {
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
}

const LocationFilter = ({ selectedLocations, setSelectedLocations }: LocationFilterProps) => {
  const { t } = useLanguage();
  
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
            ? t("search.all")
            : selectedLocations.length === 1
            ? selectedLocations[0]
            : `${selectedLocations.length}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-white">
        <DropdownMenuCheckboxItem
          key="Everywhere"
          checked={selectedLocations.includes("Everywhere")}
          onCheckedChange={() => handleLocationChange("Everywhere")}
          className="cursor-pointer"
        >
          {t("search.all")}
        </DropdownMenuCheckboxItem>
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
