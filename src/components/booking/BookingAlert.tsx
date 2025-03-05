
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const BookingAlert = () => {
  return (
    <Alert className="mb-6">
      <Info className="h-4 w-4" />
      <AlertDescription>
        Our flexible refund policy: Get a full refund if you cancel more than 48 hours before the class. 
        No refunds are available within 48 hours of the class start time.
      </AlertDescription>
    </Alert>
  );
};

export default BookingAlert;
