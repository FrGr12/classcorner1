import { useState } from "react";
import { Search, MapPin, Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterButtons from "../filters/FilterButtons";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const IntegratedSearch = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Everywhere"]);
  const [selectedTime, setSelectedTime] = useState<string>("Any week");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedLocations.length > 0 && !selectedLocations.includes("Everywhere")) {
      params.set("locations", selectedLocations.join(","));
    }
    if (selectedTime !== "Any week") params.set("time", selectedTime);
    
    navigate(`/browse?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-2xl ml-4">
      {/* Mobile View */}
      <div className="md:hidden w-full">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="w-full">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <Search className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">Search classes...</span>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-lg font-semibold">Search Classes</SheetTitle>
            </SheetHeader>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for classes..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 py-6 text-base"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>
              
              <FilterButtons
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedLocations={selectedLocations}
                selectedTime={selectedTime}
                setOpen={() => {}}
                setSelectedLocations={setSelectedLocations}
              />

              <button
                onClick={handleSearch}
                className="w-full py-3 bg-accent-purple text-white rounded-xl font-medium hover:bg-accent-purple/90 transition-colors"
              >
                Search
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full">
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

          <FilterButtons
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedLocations={selectedLocations}
            selectedTime={selectedTime}
            setOpen={() => {}}
            setSelectedLocations={setSelectedLocations}
          />

          <button 
            onClick={handleSearch}
            className="ml-2 p-3 bg-accent-purple text-white rounded-full hover:bg-accent-purple/90 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegratedSearch;