import { useState } from "react";
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

  if (!isWaitlistEnabled) return null;

  return (
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
  );
};

export default WaitlistButton;