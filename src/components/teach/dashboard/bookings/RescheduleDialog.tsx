import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Booking } from "@/types/booking";

interface RescheduleDialogProps {
  booking: Booking;
  onClose: () => void;
  onConfirm: (bookingId: number, sessionId: number) => Promise<void>;
}

const RescheduleDialog = ({ booking, onClose, onConfirm }: RescheduleDialogProps) => {
  const [availableSessions, setAvailableSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAvailableSessions();
  }, [booking.course_id]);

  const fetchAvailableSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('course_sessions')
        .select('*')
        .eq('course_id', booking.course_id)
        .gt('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;
      setAvailableSessions(data || []);
    } catch (error) {
      console.error('Error fetching available sessions:', error);
    }
  };

  const handleConfirm = async () => {
    if (!selectedSession) return;
    setIsLoading(true);
    await onConfirm(booking.id, parseInt(selectedSession));
    setIsLoading(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Booking</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select New Date/Time</label>
            <Select value={selectedSession} onValueChange={setSelectedSession}>
              <SelectTrigger>
                <SelectValue placeholder="Select a new session" />
              </SelectTrigger>
              <SelectContent>
                {availableSessions.map((session) => (
                  <SelectItem key={session.id} value={session.id.toString()}>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(new Date(session.start_time), "PPp")}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedSession || isLoading}
          >
            Confirm Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;