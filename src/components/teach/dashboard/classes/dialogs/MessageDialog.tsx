
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

const MessageDialog = ({ open, onOpenChange, classId }: MessageDialogProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!classId || !message.trim()) return;

    try {
      setIsSending(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get all students enrolled in the class
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('student_id')
        .eq('course_id', classId)
        .eq('status', 'confirmed');

      if (bookingsError) throw bookingsError;

      // Create communications for each student
      const communications = bookings?.map(booking => ({
        instructor_id: user.id,
        student_id: booking.student_id,
        course_id: classId,
        message_content: message,
        message_type: 'class_announcement'
      }));

      if (communications?.length) {
        const { error: sendError } = await supabase
          .from('communications')
          .insert(communications);

        if (sendError) throw sendError;

        toast.success("Message sent to all participants");
        setMessage("");
        onOpenChange(false);
      } else {
        toast.info("No participants to message");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Participants
          </DialogTitle>
          <DialogDescription>
            Send a message to all participants in this class
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-[150px]"
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending}
            isLoading={isSending}
            loadingText="Sending..."
          >
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
