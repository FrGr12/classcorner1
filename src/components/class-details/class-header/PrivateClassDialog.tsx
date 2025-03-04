
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PrivateClassDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const PrivateClassDialog = ({
  isOpen,
  isLoading,
  onClose,
  onSubmit
}: PrivateClassDialogProps) => {
  const [privateMessage, setPrivateMessage] = useState("");

  const handleSubmit = () => {
    onSubmit(privateMessage);
    setPrivateMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-labelledby="private-class-dialog-title" aria-describedby="private-class-dialog-description">
        <DialogHeader>
          <DialogTitle id="private-class-dialog-title">Request Private Class</DialogTitle>
          <DialogDescription id="private-class-dialog-description">
            Send a message to the instructor requesting a private class session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Tell the instructor about your private class request..." 
              value={privateMessage} 
              onChange={e => setPrivateMessage(e.target.value)} 
              className="min-h-[100px]" 
              aria-required="true" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !privateMessage.trim()} 
            aria-busy={isLoading}
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateClassDialog;
