
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { Booking } from "@/types/booking";
import { useState } from "react";
import CancellationDialog from "@/components/class-details/CancellationDialog";
import RescheduleDialog from "@/components/class-details/RescheduleDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExpressCheckout from "@/components/payment/ExpressCheckout";
import { ClassItem } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

interface BookingFooterActionsProps {
  booking: Booking | null;
  isSubmitting: boolean;
  isGuestBooking: boolean;
  handleAction: () => void;
  isDisabled: boolean;
  classItem?: ClassItem;
}

const BookingFooterActions = ({
  booking,
  isSubmitting,
  isGuestBooking,
  handleAction,
  isDisabled,
  classItem
}: BookingFooterActionsProps) => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);
  const [isExpressDialogOpen, setIsExpressDialogOpen] = useState(false);
  const [hasSavedPaymentMethods, setHasSavedPaymentMethods] = useState(false);
  const [isCheckingPaymentMethods, setIsCheckingPaymentMethods] = useState(true);

  useEffect(() => {
    // Check if user has saved payment methods
    const checkSavedPaymentMethods = async () => {
      try {
        setIsCheckingPaymentMethods(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setHasSavedPaymentMethods(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('user_payment_methods')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);
          
        if (error) throw error;
        setHasSavedPaymentMethods(data && data.length > 0);
      } catch (error) {
        console.error("Error checking payment methods:", error);
        setHasSavedPaymentMethods(false);
      } finally {
        setIsCheckingPaymentMethods(false);
      }
    };
    
    if (!booking && !isGuestBooking) {
      checkSavedPaymentMethods();
    }
  }, [booking, isGuestBooking]);

  if (booking) {
    return (
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
    );
  }

  if (isGuestBooking) {
    return (
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
        ) : "Continue as Guest"}
      </Button>
    );
  }

  return (
    <>
      {hasSavedPaymentMethods && classItem && (
        <>
          <Dialog open={isExpressDialogOpen} onOpenChange={setIsExpressDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                size="lg"
                className="w-full gap-2 text-base bg-accent-purple hover:bg-accent-purple/90"
              >
                <Zap className="h-5 w-5" />
                Express Checkout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Express Checkout</DialogTitle>
                <DialogDescription>
                  Complete your booking quickly using your saved payment method.
                </DialogDescription>
              </DialogHeader>
              <ExpressCheckout 
                classItem={classItem} 
                onClose={() => setIsExpressDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>
        </>
      )}

      <Button 
        onClick={handleAction} 
        size="lg"
        variant={hasSavedPaymentMethods ? "outline" : "default"}
        className="w-full text-base"
        disabled={isDisabled}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : "Proceed to Payment"}
      </Button>
    </>
  );
};

export default BookingFooterActions;
