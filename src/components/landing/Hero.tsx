import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Austin",
  "Seattle",
];

const Hero = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (selectedCity) params.set("city", selectedCity);
    
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <header className="relative container-padding py-4">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          className="glass-panel p-2 rounded-full flex flex-col md:flex-row gap-2 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search for classes..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-neutral-100 border-none w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <MapPin className="w-5 h-5 text-neutral-400" />
            <Select onValueChange={setSelectedCity}>
              <SelectTrigger className="border-0 p-0 h-auto w-[140px]">
                <SelectValue placeholder="Pick a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city.toLowerCase()}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;