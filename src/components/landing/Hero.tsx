import { motion } from "framer-motion";
import { Search, Users, Calendar, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { format } from "date-fns";

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Austin",
  "Seattle",
];

const Hero = () => {
  const [date, setDate] = useState<Date>();
  const [searchInput, setSearchInput] = useState("");

  return (
    <header className="relative container-padding py-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/photo-1483058712412-4245e9b90334")',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-32 pb-24">
        <motion.h1 
          className="heading-xl mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Creative Classes
        </motion.h1>
        <motion.p 
          className="text-2xl text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          4,000+ hands-on experiences to try
        </motion.p>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="glass-panel p-2 rounded-full flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="What do you want to do?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-0 focus-visible:ring-0 p-0 h-auto placeholder:text-neutral-500"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <MapPin className="w-5 h-5 text-neutral-400" />
              <Select>
                <SelectTrigger className="border-0 p-0 h-auto w-[140px]">
                  <SelectValue placeholder="Pick a city (optional)" />
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
            
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto">
                    {date ? format(date, 'PPP') : <span className="text-neutral-500">Pick a date (optional)</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <button className="button-primary rounded-full whitespace-nowrap">
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;