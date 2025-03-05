
import { useState } from "react";
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

const MessageDialog = ({ isOpen, onOpenChange, instructor }: MessageDialogProps) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to contact instructors");
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
      
      toast.success("Message sent successfully");
      setMessage("");
      setSubject("");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message {instructor.firstName}</DialogTitle>
          <DialogDescription>
            Send a message to {instructor.firstName} about their classes or inquire about private lessons.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Question about your pottery class"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here..."
              className="h-32"
            />
          </div>
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
            isLoading={isLoading}
            loadingText="Sending..."
            disabled={!message.trim() || !subject.trim()}
            size="default"
          >
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
