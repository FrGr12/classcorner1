
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateButtons from "@/components/landing/class-card/DateButtons";
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useState } from "react";

interface ClassDatesProps {
  classItem: ClassItem;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const ClassDates = ({ classItem, selectedDate: initialSelectedDate, onDateSelect }: ClassDatesProps) => {
  const navigate = useNavigate();
  const dates = Array.isArray(classItem.date) ? classItem.date : [classItem.date];
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleBooking = () => {
    if (!selectedDate) {
      return;
    }
    
    navigate("/booking-confirmation", { 
      state: { 
        classItem: {
          ...classItem,
          date: selectedDate
        }
      }
    });
  };
  
  return (
    <>
      <Separator className="my-4 sm:my-6" />
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Available Dates</h3>
        </div>
        
        {!selectedDate && (
          <Alert variant="default" className="bg-accent-purple/5 border-accent-purple/20 text-accent-purple">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please select a date below to continue with your booking.
            </AlertDescription>
          </Alert>
        )}
        
        {selectedDate && (
          <div className="p-3 sm:p-4 bg-neutral-50 rounded-lg border border-accent-purple/20">
            <h4 className="font-medium mb-1 sm:mb-2">Selected Date:</h4>
            <p className="text-neutral-600">
              {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Class duration: {classItem.duration || '2 hours'}
            </p>
            <div className="mt-4">
              <Button 
                onClick={handleBooking}
                className="w-full sm:w-auto"
              >
                Continue to Booking
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-2">
          <DateButtons 
            dates={dates}
            price={classItem.price}
            selectedDate={selectedDate}
            classId={classItem.id}
            category={classItem.category}
            onDateSelect={handleDateSelect}
          />
        </div>
      </div>
    </>
  );
};

export default ClassDates;
