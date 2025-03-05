import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Booking } from "@/types/booking";

interface CancellationDialogProps {
  booking: Booking;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CancellationDialog = ({
  booking,
  isOpen,
  onOpenChange,
}: CancellationDialogProps) => {
  const [reason, setReason] = useState("");

  const handleCancellation = async () => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          cancellation_reason: reason,
          cancellation_date: new Date().toISOString()
        })
        .eq('id', booking.id);

      if (error) throw error;

      toast.success("Booking has been cancelled");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogDescription>
            Please provide a reason for cancellation
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Reason for cancellation..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Back
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleCancellation}
            disabled={!reason.trim()}
          >
            Confirm Cancellation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancellationDialog;