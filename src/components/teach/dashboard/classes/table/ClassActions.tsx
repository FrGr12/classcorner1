
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare, ArrowUp, Share2 } from "lucide-react";

interface ClassActionsProps {
  classId: number;
  onEdit: (e: React.MouseEvent) => void;
  onMessage: (e: React.MouseEvent) => void;
  onPromote: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
}

const ClassActions = ({ classId, onEdit, onMessage, onPromote, onShare }: ClassActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onEdit}
        className="bg-accent-purple hover:bg-accent-purple/90"
      >
        <Edit className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onMessage}
        className="bg-accent-purple hover:bg-accent-purple/90"
      >
        <MessageSquare className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onPromote}
        className="bg-accent-purple hover:bg-accent-purple/90"
      >
        <ArrowUp className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onShare}
        className="bg-accent-purple hover:bg-accent-purple/90"
      >
        <Share2 className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
};

export default ClassActions;
