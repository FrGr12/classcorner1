import { motion } from "framer-motion";
import { Search, Users, Calendar } from "lucide-react";
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
import { useState } from "react";
import { format } from "date-fns";

const Hero = () => {
  const [date, setDate] = useState<Date>();

  return (
    <header className="container-padding py-12">
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-32 pb-24">
        <motion.h1 
          className="heading-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Creative Classes
        </motion.h1>
        <motion.p 
          className="text-2xl text-neutral-600 mb-12"
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
              <Select>
                <SelectTrigger className="border-0 p-0 h-auto w-full text-left">
                  <SelectValue placeholder="What do you want to do?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ny">New York City</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                  <SelectItem value="la">Los Angeles</SelectItem>
                  <SelectItem value="ch">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto">
                    {date ? format(date, 'PPP') : <span className="text-neutral-500">Pick a date</span>}
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
            
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <Users className="w-5 h-5 text-neutral-400" />
              <Select>
                <SelectTrigger className="border-0 p-0 h-auto w-24">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3">3 people</SelectItem>
                  <SelectItem value="4">4+ people</SelectItem>
                </SelectContent>
              </Select>
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