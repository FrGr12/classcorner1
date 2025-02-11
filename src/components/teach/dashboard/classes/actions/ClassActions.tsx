
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare, ArrowUp, Share2 } from "lucide-react";
import MessageParticipantsDialog from "../dialogs/MessageParticipantsDialog";
import ShareClassDialog from "../dialogs/ShareClassDialog";

interface ClassActionsProps {
  classId: number;
  onEditClick: (classId: number, e: React.MouseEvent) => void;
  onMessageClick: (classId: number) => void;
  onPromoteClick: (classId: number) => void;
  onShareClick: (classId: number) => void;
}

const ClassActions = ({
  classId,
  onEditClick,
  onMessageClick,
  onPromoteClick,
  onShareClick,
}: ClassActionsProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => onEditClick(classId, e)}
            className="bg-accent-purple hover:bg-accent-purple/90"
          >
            <Edit className="h-4 w-4 text-white" />
          </Button>
          <span className="text-xs text-muted-foreground">Edit</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMessageOpen(true)}
            className="bg-accent-purple hover:bg-accent-purple/90"
          >
            <MessageSquare className="h-4 w-4 text-white" />
          </Button>
          <span className="text-xs text-muted-foreground">Message</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPromoteClick(classId)}
            className="bg-accent-purple hover:bg-accent-purple/90"
          >
            <ArrowUp className="h-4 w-4 text-white" />
          </Button>
          <span className="text-xs text-muted-foreground">Promote</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsShareOpen(true)}
            className="bg-accent-purple hover:bg-accent-purple/90"
          >
            <Share2 className="h-4 w-4 text-white" />
          </Button>
          <span className="text-xs text-muted-foreground">Share</span>
        </div>
      </div>

      <MessageParticipantsDialog
        open={isMessageOpen}
        onOpenChange={setIsMessageOpen}
        classId={classId}
      />

      <ShareClassDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        classId={classId}
      />
    </>
  );
};

export default ClassActions;
