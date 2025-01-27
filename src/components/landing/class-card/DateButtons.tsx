import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DateButtonsProps {
  dates: Date[];
  price: number;
}

const DateButtons = ({ dates }: DateButtonsProps) => {
  const visibleDates = dates.slice(0, 3);
  const hasMoreDates = dates.length > 3;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {visibleDates.map((date, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          {format(new Date(date), 'EEE, d MMM')}
        </Button>
      ))}
      {hasMoreDates && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
        >
          +{dates.length - 3} more dates
        </Button>
      )}
    </div>
  );
};

export default DateButtons;