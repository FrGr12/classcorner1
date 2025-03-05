
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";

interface PrivateRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassItem;
}

const PrivateRequestDialog = ({
  isOpen,
  onClose,
  classItem,
}: PrivateRequestDialogProps) => {
  const [privateMessage, setPrivateMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePrivateRequest = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to request a private class",
          variant: "destructive"
        });
        return;
      }

      const { error: messageError } = await supabase
        .from("communications")
        .insert({
          student_id: user.id,
          instructor_id: classItem.instructor_id,
          course_id: classItem.id,
          message_content: privateMessage,
          message_type: "private_request",
          status: "pending"
        });

      if (messageError) throw messageError;

      toast({
        title: "Success",
        description: "Private class request sent successfully"
      });
      onClose();
      setPrivateMessage("");
    } catch (error) {
      console.error('Error sending private request:', error);
      toast({
        title: "Error",
        description: "Failed to send private class request"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Request Private Class</DialogTitle>
          <DialogDescription className="text-sm">
            Send a message to the instructor requesting a private class session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-sm">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell the instructor about your private class request..."
              value={privateMessage}
              onChange={(e) => setPrivateMessage(e.target.value)}
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePrivateRequest}
            disabled={isLoading || !privateMessage.trim()}
            className="text-sm"
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateRequestDialog;
