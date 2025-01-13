import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const FilterButtons = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedFilters.includes("morning") ? "default" : "outline"}
        onClick={() => toggleFilter("morning")}
      >
        Morning
      </Button>
      <Button
        variant={selectedFilters.includes("afternoon") ? "default" : "outline"}
        onClick={() => toggleFilter("afternoon")}
      >
        Afternoon
      </Button>
      <Button
        variant={selectedFilters.includes("evening") ? "default" : "outline"}
        onClick={() => toggleFilter("evening")}
      >
        Evening
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {date ? format(date, 'PPP') : 'Pick a date'}
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
  );
};

export default FilterButtons;