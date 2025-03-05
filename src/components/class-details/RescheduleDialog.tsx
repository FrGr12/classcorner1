
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
import { Calendar } from "@/components/ui/calendar";
import type { Booking } from "@/types/booking";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    booking.session?.start_time ? new Date(booking.session.start_time) : undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReschedule = async () => {
    if (!selectedDate) return;

    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('bookings')
        .update({
          original_session_id: booking.session_id,
          session_id: booking.session_id, // This will be updated once we have the new session
          rescheduled_at: new Date().toISOString(),
          status: 'rescheduled'
        })
        .eq('id', booking.id);

      if (error) throw error;

      toast.success(t("booking.rescheduled"));
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("booking.reschedule")}</DialogTitle>
          <DialogDescription>
            {t("booking.rescheduleDescription")}
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
            {t("message.cancel")}
          </Button>
          <Button 
            onClick={handleReschedule}
            disabled={!selectedDate || isSubmitting}
          >
            {isSubmitting ? t("booking.rescheduling") : t("booking.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;
