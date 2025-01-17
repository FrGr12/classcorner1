import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterButtons from "./filters/FilterButtons";
import LocationSearch from "./filters/LocationSearch";

const Hero = () => {
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
    <header className="relative container-padding py-4 md:py-8">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-panel rounded-full flex items-center divide-x divide-neutral-200 p-2 shadow-lg">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <Filter className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm font-medium">
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
              <span className="text-sm font-medium">
                {selectedLocations.includes("Everywhere") 
                  ? "Anywhere" 
                  : selectedLocations.join(", ")}
              </span>
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <Calendar className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm font-medium">{selectedTime}</span>
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
        </motion.div>
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
    </header>
  );
};

export default Hero;