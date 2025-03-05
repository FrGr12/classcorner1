
import { useState, useCallback, memo } from "react";
import { InstructorProfile } from "@/types/instructor";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: InstructorProfile;
}

const MessageDialog = memo(({ isOpen, onOpenChange, instructor }: MessageDialogProps) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubjectChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  }, []);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleSendMessage = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to contact instructors", {
          description: "You need to be logged in to send messages",
          duration: 5000
        });
        return;
      }
      
      // Send message to instructor
      const { error } = await supabase
        .from("communications")
        .insert({
          student_id: user.id,
          instructor_id: instructor.id,
          message_content: message,
          message_type: "inquiry",
          status: "sent",
          communication_context: subject
        });
      
      if (error) throw error;
      
      toast.success("Message sent successfully", {
        description: `Your message has been sent to ${instructor.firstName}`,
        duration: 3000
      });
      
      setMessage("");
      setSubject("");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: error.message || "Please try again later",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  }, [message, subject, instructor, onOpenChange]);

  const isValid = subject.trim() !== "" && message.trim() !== "";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px]"
        aria-labelledby="message-dialog-title"
        aria-describedby="message-dialog-description"
      >
        <DialogHeader>
          <DialogTitle id="message-dialog-title">Message {instructor.firstName}</DialogTitle>
          <DialogDescription id="message-dialog-description">
            Send a message to {instructor.firstName} about their classes or inquire about private lessons.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject" id="subject-label">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="e.g., Question about your pottery class"
              aria-labelledby="subject-label"
              aria-required="true"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message" id="message-label">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Enter your message here..."
              className="h-32"
              aria-labelledby="message-label"
              aria-required="true"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !isValid}
            aria-busy={isLoading}
            type="button"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

MessageDialog.displayName = 'MessageDialog';

export default MessageDialog;
