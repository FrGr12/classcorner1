
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Edit, Percent, Share2, Rocket } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import CreateDiscountDialog from "../discounts/CreateDiscountDialog";
import SocialShare from "./SocialShare";
import InstantBoost from "./InstantBoost";

interface ClassActionsProps {
  classId: number;
  category: string;
}

const ClassActions = ({ classId, category }: ClassActionsProps) => {
  const navigate = useNavigate();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Mock participants data - in a real app, this would come from your backend
  const mockParticipants = [
    { id: 1, name: "Sarah Johnson" },
    { id: 2, name: "Mike Chen" },
    { id: 3, name: "Emma Davis" }
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    toast.promise(
      // Replace this with actual API call
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Sending message to participants...",
        success: "Message sent successfully",
        error: "Failed to send message. Please try again."
      }
    );

    setMessage("");
    setIsMessageDialogOpen(false);
  };

  const handleEditClass = () => {
    navigate(`/edit-course/${classId}`);
  };

  const handleOpenDiscount = () => {
    setIsDiscountDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 min-w-[140px] justify-center"
          onClick={() => setIsMessageDialogOpen(true)}
        >
          <MessageSquare className="h-4 w-4" />
          Message
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 min-w-[140px] justify-center"
          onClick={handleOpenDiscount}
        >
          <Percent className="h-4 w-4" />
          Discount
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 min-w-[140px] justify-center"
          onClick={handleEditClass}
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 min-w-[140px] justify-center"
          onClick={() => toast.success("Coming soon!")}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 min-w-[140px] justify-center"
          onClick={() => toast.success("Coming soon!")}
        >
          <Rocket className="h-4 w-4" />
          Boost
        </Button>
      </div>

      <CreateDiscountDialog 
        courseId={classId} 
        open={isDiscountDialogOpen}
        onOpenChange={setIsDiscountDialogOpen}
      />
      
      <Dialog 
        open={isMessageDialogOpen} 
        onOpenChange={setIsMessageDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message Participants</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/50">
              <p className="text-sm font-medium mb-2">Recipients ({mockParticipants.length})</p>
              <div className="flex flex-wrap gap-2">
                {mockParticipants.map((participant) => (
                  <span 
                    key={participant.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {participant.name}
                  </span>
                ))}
              </div>
            </div>

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[150px] resize-none"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassActions;
