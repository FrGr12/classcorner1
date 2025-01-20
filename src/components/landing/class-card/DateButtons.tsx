import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DateButtonsProps {
  dates: Date[];
}

const DateButtons = ({ dates }: DateButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const visibleDates = dates.slice(0, 2);
  const hasMoreDates = dates.length > 2;

  return (
    <div className="mt-4 flex gap-2 items-center">
      {visibleDates.map((d, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          className="px-3 py-1 h-auto text-xs text-accent-purple hover:text-accent-purple/80 hover:bg-neutral-100 border border-accent-purple/20 rounded-lg transition-all"
          onClick={() => {
            console.log('Selected date:', d);
          }}
        >
          {format(new Date(d), 'MMM d')}
        </Button>
      ))}
      {hasMoreDates && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-1 h-auto text-xs text-primary font-medium hover:text-primary/80 hover:bg-neutral-100 border border-neutral-200 rounded-lg"
            >
              +{dates.length - 2}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="space-y-2">
              {dates.slice(2).map((d, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm text-accent-purple hover:text-accent-purple/80 hover:bg-neutral-100 border border-accent-purple/20 rounded-lg transition-all"
                  onClick={() => {
                    console.log('Selected date:', d);
                    setIsOpen(false);
                  }}
                >
                  {format(new Date(d), 'MMM d, yyyy')}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default DateButtons;