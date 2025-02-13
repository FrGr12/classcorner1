
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Users } from "lucide-react";
import type { ClassItem } from "@/types/class";

interface BookingDetailsProps {
  classItem: ClassItem;
  selectedDate?: Date;
}

const BookingDetails = ({ classItem, selectedDate }: BookingDetailsProps) => {
  const formatClassDateTime = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      return {
        date: format(date[0], "MMMM d, yyyy"),
        time: format(date[0], "h:mm a")
      };
    }
    return {
      date: format(date, "MMMM d, yyyy"),
      time: format(date, "h:mm a")
    };
  };

  const dateTime = selectedDate ? formatClassDateTime(selectedDate) : formatClassDateTime(classItem.date);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">Class</h3>
          <p className="text-neutral-600">{classItem.title}</p>
        </div>
        <div>
          <h3 className="font-medium">Instructor</h3>
          <p className="text-neutral-600">{classItem.instructor}</p>
        </div>
        <div>
          <h3 className="font-medium">Date & Time</h3>
          <p className="text-neutral-600">
            {dateTime.date} at {dateTime.time}
          </p>
        </div>
        <div>
          <h3 className="font-medium">Location</h3>
          <div className="text-neutral-600">
            <p>{classItem.city} Studio</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 pt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{classItem.duration || '2 hours'}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{classItem.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Max {classItem.maxParticipants || 10} people</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <span className="font-medium">Price</span>
          <span className="text-xl font-semibold">${classItem.price}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingDetails;
