
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InstructorProfile } from "@/types/instructor";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface MessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: InstructorProfile;
}

const MessageDialog = ({ 
  isOpen, 
  onOpenChange,
  instructor
}: MessageDialogProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { t } = useLanguage();

  const handleSend = async () => {
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(`Message sent to ${instructor.displayName}`);
    setMessage("");
    setIsSending(false);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message {instructor.displayName}</DialogTitle>
          <DialogDescription>
            Send a message to this instructor. They'll typically respond within 24 hours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-[120px]"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!message.trim() || isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
