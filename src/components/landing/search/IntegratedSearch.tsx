import { useState } from "react";
import { Search, MapPin, Calendar, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterButtons from "../filters/FilterButtons";
import LocationSearch from "../filters/LocationSearch";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const IntegratedSearch = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Everywhere"]);
  const [selectedTime, setSelectedTime] = useState<string>("Any week");
  const [locationOpen, setLocationOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedLocations.length > 0 && !selectedLocations.includes("Everywhere")) {
      params.set("locations", selectedLocations.join(","));
    }
    if (selectedTime !== "Any week") params.set("time", selectedTime);
    
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <div className="flex-1 max-w-2xl">
      <div className="glass-panel rounded-full flex items-center divide-x divide-neutral-200 p-2">
        <div className="flex-1 px-4 py-2">
          <Input
            type="text"
            placeholder="Search for classes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 px-0 py-0 h-auto placeholder:text-neutral-500"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Filter className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium hidden sm:inline">
                {selectedCategories.length === 0 ? "All categories" : `${selectedCategories.length} selected`}
              </span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <FilterButtons
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedLocations={selectedLocations}
              selectedTime={selectedTime}
              setOpen={setLocationOpen}
              setSelectedLocations={setSelectedLocations}
            />
          </DialogContent>
        </Dialog>

        <button 
          onClick={() => setLocationOpen(true)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <MapPin className="w-4 h-4 text-neutral-500" />
          <span className="text-sm font-medium hidden sm:inline">
            {selectedLocations.includes("Everywhere") 
              ? "Anywhere" 
              : selectedLocations.join(", ")}
          </span>
        </button>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium hidden sm:inline">{selectedTime}</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Select Time Range</h3>
              {/* Time selection options will go here */}
            </div>
          </DialogContent>
        </Dialog>

        <button 
          onClick={handleSearch}
          className="ml-2 p-3 bg-accent-purple text-white rounded-full hover:bg-accent-purple/90 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      <LocationSearch
        open={locationOpen}
        onOpenChange={setLocationOpen}
        setSelectedLocations={setSelectedLocations}
        cities={[
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
        ]}
      />
    </div>
  );
};

export default IntegratedSearch;