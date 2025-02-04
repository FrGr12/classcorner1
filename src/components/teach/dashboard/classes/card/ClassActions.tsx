
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Edit } from "lucide-react";
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

    try {
      // Here you would integrate with your messaging system
      toast.success("Message sent successfully!");
      setMessage("");
      setIsMessageDialogOpen(false);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center justify-start">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsMessageDialogOpen(true)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Message Participants
        </Button>

        <CreateDiscountDialog courseId={classId} />
        
        <InstantBoost courseId={classId} />
        
        <SocialShare courseId={classId} category={category} />

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/teach/classes/${classId}/edit`)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Class
        </Button>
      </div>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Participants</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-muted/50">
              <p className="text-sm font-medium mb-2">Recipients:</p>
              <div className="flex flex-wrap gap-2">
                {mockParticipants.map((participant) => (
                  <span 
                    key={participant.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
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
              className="min-h-[150px]"
            />
          </div>

          <DialogFooter>
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
    </>
  );
};

export default ClassActions;
