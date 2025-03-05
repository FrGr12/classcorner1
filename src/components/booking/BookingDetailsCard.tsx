
import { format } from "date-fns";
import { ClassItem } from "@/types/class";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BookingDetailsCardProps {
  classItem: ClassItem;
  isGuestBooking: boolean;
}

const BookingDetailsCard = ({ classItem, isGuestBooking }: BookingDetailsCardProps) => {
  const formatClassDateTime = (date: Date | Date[]) => {
    try {
      if (Array.isArray(date)) {
        return {
          date: format(new Date(date[0]), "MMMM d, yyyy"),
          time: format(new Date(date[0]), "h:mm a")
        };
      }
      return {
        date: format(new Date(date), "MMMM d, yyyy"),
        time: format(new Date(date), "h:mm a")
      };
    } catch (error) {
      console.error("Date formatting error:", error);
      return { date: "Invalid date", time: "Invalid time" };
    }
  };

  const dateTime = formatClassDateTime(classItem.date);

  return (
    <>
      {!isGuestBooking && (
        <>
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
              <p>123 Creative Street</p>
              <p>{classItem.city}, Sweden</p>
            </div>
          </div>
        </>
      )}
      
      <Separator />
      
      <div className="flex justify-between items-center">
        <span className="font-medium">Price</span>
        <span className="text-xl font-semibold">${classItem.price}</span>
      </div>

      {!isGuestBooking && (
        <Alert>
          <AlertDescription className="text-sm">
            By proceeding with this booking, you acknowledge our cancellation policy. 
            Cancellations made more than 48 hours before the class start time are eligible for a full refund.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default BookingDetailsCard;
