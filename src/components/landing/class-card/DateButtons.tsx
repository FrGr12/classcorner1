import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface DateButtonsProps {
  dates: Date[];
  price: number;
  maxParticipants?: number;
  classId?: number;
  category?: string;
}

const DateButtons = ({ dates, price, classId, category }: DateButtonsProps) => {
  const navigate = useNavigate();
  const visibleDates = dates.slice(0, 3);
  const hasMoreDates = dates.length > 3;

  const handleDateClick = (date: Date) => {
    if (classId && category) {
      navigate(`/class/${category}/${classId}`, { 
        state: { selectedDate: date }
      });
    }
  };

  return (
    <div className="mt-2">
      <p className="text-sm font-medium text-neutral-700 mb-2">Available dates to book:</p>
      <div className="flex flex-wrap gap-2">
        {visibleDates.map((date, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => handleDateClick(date)}
          >
            {format(new Date(date), 'EEE, d MMM')}
          </Button>
        ))}
        {hasMoreDates && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => classId && category && navigate(`/class/${category}/${classId}`)}
          >
            +{dates.length - 3} more dates
          </Button>
        )}
      </div>
    </div>
  );
};

export default DateButtons;