import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateButtons from "@/components/landing/class-card/DateButtons";
import { ClassItem } from "@/types/class";

interface ClassDatesProps {
  classItem: ClassItem;
  selectedDate?: Date;
}

const ClassDates = ({ classItem, selectedDate }: ClassDatesProps) => {
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
        <DateButtons 
          dates={Array.isArray(classItem.date) ? classItem.date : [classItem.date]}
          price={classItem.price}
          selectedDate={selectedDate}
        />
      </div>
    </>
  );
};

export default ClassDates;