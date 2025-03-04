
import { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SavedPaymentMethods, { SavedPaymentMethod } from "./SavedPaymentMethods";
import { ClassItem } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ExpressCheckoutProps {
  classItem: ClassItem;
  onClose?: () => void;
}

const ExpressCheckout = ({ classItem, onClose }: ExpressCheckoutProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SavedPaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleExpressCheckout = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to book a class");

      // 1. Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          course_id: classItem.id,
          student_id: user.id,
          selected_date: classItem.date,
          total_price: classItem.price,
          status: 'pending',
          booking_type: 'express',
          payment_status: 'processing'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;
      
      // 2. Process express payment
      const { data: paymentResult, error: paymentError } = await supabase.functions.invoke(
        "process-express-payment",
        {
          body: {
            paymentMethodId: selectedPaymentMethod.id,
            bookingId: booking.id,
            amount: classItem.price
          }
        }
      );

      if (paymentError) throw paymentError;
      
      toast.success("Booking successful! You will receive a confirmation email shortly.");
      navigate("/payment-receipt", {
        state: { 
          bookingId: booking.id,
          classItem,
          paymentMethod: selectedPaymentMethod
        }
      });
      
    } catch (error: any) {
      console.error("Express checkout error:", error);
      toast.error(error.message || "Failed to process payment");
    } finally {
      setIsProcessing(false);
      onClose?.();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-accent-purple/10 rounded-lg">
        <Zap className="w-5 h-5 text-accent-purple" />
        <span className="text-sm font-medium">Express checkout with your saved payment method</span>
      </div>
      
      <SavedPaymentMethods 
        onSelect={setSelectedPaymentMethod} 
        selectedId={selectedPaymentMethod?.id}
      />
      
      <Button
        onClick={handleExpressCheckout}
        disabled={!selectedPaymentMethod || isProcessing}
        className="w-full gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Express Checkout (${classItem.price})
          </>
        )}
      </Button>
    </div>
  );
};

export default ExpressCheckout;
