
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ComposeMessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messageContent: string;
  setMessageContent: (content: string) => void;
  onSendMessage: () => void;
}

export const ComposeMessageDialog = ({ 
  isOpen, 
  onOpenChange, 
  messageContent, 
  setMessageContent, 
  onSendMessage 
}: ComposeMessageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              placeholder="Type your message here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="min-h-[200px]"
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
            onClick={onSendMessage}
            className="bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white"
            disabled={!messageContent.trim()}
          >
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
