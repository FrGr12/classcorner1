import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateButtons from "@/components/landing/class-card/DateButtons";
import { ClassItem } from "@/types/class";
import { format } from "date-fns";

interface ClassDatesProps {
  classItem: ClassItem;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const ClassDates = ({ classItem, selectedDate, onDateSelect }: ClassDatesProps) => {
  const dates = Array.isArray(classItem.date) ? classItem.date : [classItem.date];
  
  return (
    <>
      <Separator className="my-6" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Available Dates</h3>
          <Button variant="ghost" size="sm" className="text-accent-purple">
            <Calendar className="w-4 h-4 mr-2" />
            View full calendar
          </Button>
        </div>
        
        {selectedDate && (
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h4 className="font-medium mb-2">Selected Date:</h4>
            <p className="text-neutral-600">
              {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Class duration: 2 hours
            </p>
          </div>
        )}
        
        <DateButtons 
          dates={dates}
          price={classItem.price}
          selectedDate={selectedDate}
          classId={classItem.id}
          category={classItem.category}
        />
      </div>
    </>
  );
};

export default ClassDates;