import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterButtons from "./filters/FilterButtons";

const Hero = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    // Assuming default values for categories, locations, and time
    params.set("categories", "");
    params.set("locations", "Everywhere");
    params.set("time", "Any week");
    
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
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <div className="glass-panel rounded-full flex items-center p-2 shadow-lg w-full">
                <Input
                  type="text"
                  placeholder="Search for classes..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 px-4 py-2 h-auto placeholder:text-neutral-500"
                />
                <button 
                  onClick={handleSearch}
                  className="p-3 bg-accent-purple text-white rounded-full hover:bg-accent-purple/90 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-[80vh] mt-20">
              <div className="flex flex-col gap-4 p-4">
                <FilterButtons
                  selectedCategories={[]}
                  selectedLocations={["Everywhere"]}
                  selectedTime="Any week"
                  setSelectedCategories={() => {}}
                  setOpen={setIsFilterOpen}
                  setSelectedLocations={() => {}}
                />
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
