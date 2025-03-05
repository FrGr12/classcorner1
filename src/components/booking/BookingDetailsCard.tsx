
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
          date: format(new Date(date[0]), "d MMMM yyyy"),
          time: format(new Date(date[0]), "HH:mm")
        };
      }
      return {
        date: format(new Date(date), "d MMMM yyyy"),
        time: format(new Date(date), "HH:mm")
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
            <h3 className="font-medium">Klass</h3>
            <p className="text-neutral-600">{classItem.title}</p>
          </div>
          <div>
            <h3 className="font-medium">Instruktör</h3>
            <p className="text-neutral-600">{classItem.instructor}</p>
          </div>
          <div>
            <h3 className="font-medium">Datum & tid</h3>
            <p className="text-neutral-600">
              {dateTime.date} kl {dateTime.time}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Plats</h3>
            <div className="text-neutral-600">
              <p>{classItem.city} Studio</p>
              <p>Kreativitetsgatan 123</p>
              <p>{classItem.city}, Sverige</p>
            </div>
          </div>
        </>
      )}
      
      <Separator />
      
      <div className="flex justify-between items-center">
        <span className="font-medium">Pris</span>
        <span className="text-xl font-semibold">{classItem.price} kr</span>
      </div>

      {!isGuestBooking && (
        <Alert>
          <AlertDescription className="text-sm">
            Genom att fortsätta med denna bokning godkänner du vår avbokningspolicy. 
            Vid avbokningar mer än 48 timmar före klassens starttid har du rätt till full återbetalning.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default BookingDetailsCard;
