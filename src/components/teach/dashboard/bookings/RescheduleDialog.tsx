import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { Booking } from "@/types/booking";

export interface RescheduleDialogProps {
  booking: Booking;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RescheduleDialog = ({
  booking,
  isOpen,
  onOpenChange,
}: RescheduleDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    booking.session?.start_time ? new Date(booking.session.start_time) : undefined
  );
  const { toast } = useToast();

  const handleReschedule = async () => {
    if (!selectedDate) return;

    try {
      const { error } = await supabase
        .from('course_sessions')
        .update({ start_time: selectedDate.toISOString() })
        .eq('id', booking.session_id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking has been rescheduled",
      });

      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Booking</DialogTitle>
          <DialogDescription>
            Select a new date and time for this booking
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReschedule}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;