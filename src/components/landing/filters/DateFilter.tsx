import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addMonths } from "date-fns";

interface DateFilterProps {
  selectedTimeRange: string;
  setSelectedTimeRange: (range: string) => void;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

const timeRanges = [
  { label: "This week", getValue: () => ({ from: startOfWeek(new Date()), to: endOfWeek(new Date()) }) },
  { label: "This month", getValue: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { label: "Next month", getValue: () => {
    const nextMonth = addMonths(new Date(), 1);
    return { from: startOfMonth(nextMonth), to: endOfMonth(nextMonth) };
  }},
];

const DateFilter = ({ selectedTimeRange, setSelectedTimeRange, date, setDate }: DateFilterProps) => {
  const handleTimeRangeSelect = (label: string, range?: DateRange) => {
    setSelectedTimeRange(label);
    setDate(range);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 px-5 text-sm rounded-r-lg rounded-l-none border-l-0"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {selectedTimeRange}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-white">
        <DropdownMenuItem
          onClick={() => handleTimeRangeSelect("Anytime", undefined)}
        >
          Anytime
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {timeRanges.map((range) => (
          <DropdownMenuItem
            key={range.label}
            onClick={() => handleTimeRangeSelect(range.label, range.getValue())}
          >
            {range.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start font-normal"
            >
              Specific dates
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={new Date()}
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                if (newDate?.from) {
                  setSelectedTimeRange(
                    newDate.to
                      ? `${format(newDate.from, "MMM d")} - ${format(
                          newDate.to,
                          "MMM d"
                        )}`
                      : format(newDate.from, "MMM d")
                  );
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateFilter;