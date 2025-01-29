import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export interface DateButtonsProps {
  dates: Date[];
  price: number;
  maxParticipants?: number;
  classId?: number;
  category?: string;
  selectedDate?: Date;
}

const DateButtons = ({ dates, price, classId, category, selectedDate, maxParticipants }: DateButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailsPage = location.pathname.includes('/class/');
  const visibleDates = dates.slice(0, 2);
  const hasMoreDates = dates.length > 2;

  const handleDateClick = (date: Date) => {
    if (classId && category) {
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
                  {maxParticipants ? `${maxParticipants} platser kvar` : '10 platser kvar'}
                </div>
                <div className="text-sm font-medium">
                  {price} kr/person
                </div>
              </div>
              <Button
                variant={isSelected(date) ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDateClick(date);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        ))}
        {hasMoreDates && (
          <Button
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              classId && category && navigate(`/class/${category}/${classId}`);
            }}
          >
            More dates
          </Button>
        )}
      </div>
    );
  }

  // Landing page date buttons - Single line layout
  return (
    <div className="mt-1 mb-3 px-4">
      <p className="text-sm font-medium text-neutral-700 mb-1">Available dates to book:</p>
      <div className="flex items-center gap-1">
        {visibleDates.map((date, index) => (
          <Button
            key={index}
            variant={isSelected(date) ? "default" : "outline"}
            size="sm"
            className="text-xs min-w-[85px]"
            onClick={(e) => {
              e.stopPropagation();
              handleDateClick(date);
            }}
          >
            {format(new Date(date), 'EEE, d MMM')}
          </Button>
        ))}
        {hasMoreDates && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs min-w-[65px]"
            onClick={(e) => {
              e.stopPropagation();
              classId && category && navigate(`/class/${category}/${classId}`);
            }}
          >
            More dates
          </Button>
        )}
      </div>
    </div>
  );
};

export default DateButtons;