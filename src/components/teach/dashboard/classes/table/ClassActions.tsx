
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
    <div className="flex gap-1 sm:gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onEdit}
        className="h-6 w-6 sm:h-8 sm:w-8 bg-accent-purple hover:bg-accent-purple/90"
      >
        <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onMessage}
        className="h-6 w-6 sm:h-8 sm:w-8 bg-accent-purple hover:bg-accent-purple/90"
      >
        <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onPromote}
        className="h-6 w-6 sm:h-8 sm:w-8 bg-accent-purple hover:bg-accent-purple/90"
      >
        <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onShare}
        className="h-6 w-6 sm:h-8 sm:w-8 bg-accent-purple hover:bg-accent-purple/90"
      >
        <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
      </Button>
    </div>
  );
};

export default ClassActions;
