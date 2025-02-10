
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";

export interface DateButtonsProps {
  dates: Date[];
  price: number;
  maxParticipants?: number;
  classId?: number;
  category?: string;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const DateButtons = ({ 
  dates, 
  price, 
  classId, 
  category, 
  selectedDate, 
  maxParticipants = 10,
  onDateSelect 
}: DateButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailsPage = location.pathname.includes('/class/');
  const visibleDates = dates.slice(0, 2);
  const hasMoreDates = dates.length > 2;

  const handleDateClick = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDateSelect) {
      onDateSelect(date);
    } else if (classId && category) {
      navigate(`/class/${category}/${classId}`, { 
        state: { selectedDate: date }
      });
    }
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return format(new Date(date), 'yyyy-MM-dd') === format(new Date(selectedDate), 'yyyy-MM-dd');
  };

  if (isDetailsPage) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleDates.map((date, index) => (
          <div 
            key={index}
            className={`p-4 bg-white rounded-lg border ${isSelected(date) ? 'border-accent-purple' : 'border-neutral-200'} hover:border-accent-purple transition-colors`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  {format(new Date(date), 'EEE, d MMM')}
                </div>
                <div className="text-sm text-neutral-600">
                  {format(new Date(date), 'HH:mm')}–{format(new Date(date).setHours(new Date(date).getHours() + 2), 'HH:mm')}
                </div>
                <div className="text-sm text-neutral-600">
                  {maxParticipants} spots left
                </div>
                <div className="text-sm font-medium">
                  ${price} per person
                </div>
              </div>
              <Button
                variant={isSelected(date) ? "default" : "outline"}
                onClick={(e) => handleDateClick(date, e)}
              >
                Book Now
              </Button>
            </div>
          </div>
        ))}
        {hasMoreDates && (
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center gap-2 text-base"
              onClick={(e) => {
                e.stopPropagation();
                classId && category && navigate(`/class/${category}/${classId}`);
              }}
            >
              <Calendar className="w-5 h-5" />
              View more dates
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-3 pb-3">
      <div className="grid grid-cols-3 gap-2">
        {visibleDates.map((date, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs w-full bg-white hover:bg-neutral-50 border-neutral-200"
            onClick={(e) => handleDateClick(date, e)}
          >
            {format(new Date(date), 'EEE, d MMM')}
          </Button>
        ))}
        {hasMoreDates && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs w-full flex items-center justify-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              classId && category && navigate(`/class/${category}/${classId}`);
            }}
          >
            <Calendar className="w-3 h-3" />
            View more dates
          </Button>
        )}
      </div>
    </div>
  );
};

export default DateButtons;

