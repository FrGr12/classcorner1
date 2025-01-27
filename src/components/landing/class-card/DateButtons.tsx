import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Users } from "lucide-react";

interface DateButtonsProps {
  dates: Date[];
  price: number;
  maxParticipants?: number;
}

const DateButtons = ({ dates, price, maxParticipants = 10 }: DateButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const visibleDates = dates.slice(0, 2);
  const hasMoreDates = dates.length > 2;

  const DateCard = ({ date }: { date: Date }) => (
    <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
      <div className="space-y-1">
        <p className="font-medium">{format(new Date(date), 'EEEE, d MMM')}</p>
        <p className="text-sm text-neutral-600">{format(new Date(date), 'HH:mm')} - {format(new Date(date).setHours(date.getHours() + 2), 'HH:mm')}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-600">
        <Users className="w-4 h-4" />
        <span>{maxParticipants} platser kvar</span>
      </div>
      <div className="flex items-center justify-between">
        <p>
          <span className="font-medium">${price}</span>
          <span className="text-sm text-neutral-600">/person</span>
        </p>
        <Button 
          variant="default"
          size="sm"
          onClick={() => {
            console.log('Selected date:', date);
          }}
        >
          Book Now
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleDates.map((date, index) => (
          <DateCard key={index} date={date} />
        ))}
      </div>
      
      {hasMoreDates && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
            >
              Show {dates.length - 2} more dates
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-2">
            <div className="space-y-2">
              {dates.slice(2).map((date, index) => (
                <DateCard key={index} date={date} />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default DateButtons;