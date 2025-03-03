
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Booking } from "@/types/booking";
import { useState } from "react";
import CancellationDialog from "@/components/class-details/CancellationDialog";
import RescheduleDialog from "@/components/class-details/RescheduleDialog";

interface BookingFooterActionsProps {
  booking: Booking | null;
  isSubmitting: boolean;
  isGuestBooking: boolean;
  handleAction: () => void;
  isDisabled: boolean;
}

const BookingFooterActions = ({
  booking,
  isSubmitting,
  isGuestBooking,
  handleAction,
  isDisabled
}: BookingFooterActionsProps) => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);

  return (
    <>
      {booking ? (
        <>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setIsCancellationOpen(true)}
            className="w-full text-base"
          >
            Cancel Booking
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => setIsRescheduleOpen(true)}
            className="w-full text-base"
          >
            Reschedule
          </Button>
          
          <CancellationDialog
            booking={booking}
            isOpen={isCancellationOpen}
            onOpenChange={setIsCancellationOpen}
          />
          <RescheduleDialog
            booking={booking}
            isOpen={isRescheduleOpen}
            onOpenChange={setIsRescheduleOpen}
          />
        </>
      ) : (
        <Button 
          onClick={handleAction} 
          size="lg"
          className="w-full text-base"
          disabled={isDisabled}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            isGuestBooking ? "Continue as Guest" : "Proceed to Payment"
          )}
        </Button>
      )}
    </>
  );
};

export default BookingFooterActions;
