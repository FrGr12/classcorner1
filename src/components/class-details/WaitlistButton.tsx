import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface WaitlistButtonProps {
  courseId: number;
  sessionId?: number;
  isWaitlistEnabled: boolean;
}

const WaitlistButton = ({ courseId, sessionId, isWaitlistEnabled }: WaitlistButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [expiryTime, setExpiryTime] = useState<string | null>(null);

  useEffect(() => {
    checkWaitlistStatus();
  }, [courseId]);

  const checkWaitlistStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('waitlist_entries')
        .select('*')
        .eq('course_id', courseId)
        .eq('user_id', user.id)
        .eq('status', 'waiting')
        .single();

      if (data && data.notification_sent_at && !data.last_notification_sent_at) {
        setHasNotification(true);
        // Set expiry time 3 hours from notification_sent_at
        const notificationTime = new Date(data.notification_sent_at);
        const expiryTime = new Date(notificationTime.getTime() + (3 * 60 * 60 * 1000));
        setExpiryTime(expiryTime.toISOString());
      }
    } catch (error) {
      console.error("Error checking waitlist status:", error);
    }
  };

  const handleJoinWaitlist = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to join the waitlist");
        return;
      }

      const { error } = await supabase
        .from('waitlist_entries')
        .insert({
          course_id: courseId,
          session_id: sessionId,
          user_id: user.id,
          status: 'waiting'
        });

      if (error) throw error;

      toast.success("You've been added to the waitlist. We'll notify you when a spot becomes available.");
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Error joining waitlist:", error);
      toast.error(error.message || "Failed to join waitlist");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptSpot = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to accept the spot");
        return;
      }

      const { error: updateError } = await supabase
        .from('waitlist_entries')
        .update({
          status: 'accepted',
          last_notification_sent_at: new Date().toISOString()
        })
        .eq('course_id', courseId)
        .eq('user_id', user.id)
        .eq('status', 'waiting');

      if (updateError) throw updateError;

      // Create booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          course_id: courseId,
          session_id: sessionId,
          student_id: user.id,
          status: 'pending',
          booking_type: 'individual'
        });

      if (bookingError) throw bookingError;

      toast.success("You've successfully accepted the spot. Please complete your booking.");
      setHasNotification(false);
      // Redirect to booking completion page or show booking dialog
    } catch (error: any) {
      console.error("Error accepting spot:", error);
      toast.error(error.message || "Failed to accept spot");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineSpot = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to decline the spot");
        return;
      }

      const { error } = await supabase
        .from('waitlist_entries')
        .update({
          status: 'declined',
          last_notification_sent_at: new Date().toISOString()
        })
        .eq('course_id', courseId)
        .eq('user_id', user.id)
        .eq('status', 'waiting');

      if (error) throw error;

      toast.success("You've declined the spot. It will be offered to the next person on the waitlist.");
      setHasNotification(false);
    } catch (error: any) {
      console.error("Error declining spot:", error);
      toast.error(error.message || "Failed to decline spot");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isWaitlistEnabled) return null;

  return (
    <>
      {hasNotification ? (
        <div className="space-y-4">
          <div className="text-sm font-medium">
            <p className="text-green-600">A spot is available!</p>
            {expiryTime && (
              <p className="text-gray-600">
                Expires {new Date(expiryTime).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={handleAcceptSpot}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Accept Spot"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleDeclineSpot}
              disabled={isLoading}
            >
              Decline
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Button 
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="w-full"
          >
            Join Waitlist
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join Waitlist</DialogTitle>
                <DialogDescription>
                  Would you like to join the waitlist for this class? We'll notify you when a spot becomes available.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleJoinWaitlist}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default WaitlistButton;