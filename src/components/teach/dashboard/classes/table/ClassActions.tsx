
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare, ArrowUp, Share2 } from "lucide-react";

interface ClassActionsProps {
  classId: number;
  onEdit: (e: React.MouseEvent) => void;
  onMessage: (e: React.MouseEvent) => void;
  onPromote: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
}

const ClassActions = ({ onEdit, onMessage, onPromote, onShare }: ClassActionsProps) => {
  return (
    <div className="flex gap-0.5 sm:gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="h-7 w-7 sm:h-8 sm:w-8 bg-accent-purple/5 sm:hover:bg-accent/50"
      >
        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-purple" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onMessage}
        className="h-7 w-7 sm:h-8 sm:w-8 bg-accent-purple/5 sm:hover:bg-accent/50"
      >
        <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-purple" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onPromote}
        className="h-7 w-7 sm:h-8 sm:w-8 bg-accent-purple/5 sm:hover:bg-accent/50"
      >
        <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-purple" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onShare}
        className="h-7 w-7 sm:h-8 sm:w-8 bg-accent-purple/5 sm:hover:bg-accent/50"
      >
        <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-purple" />
      </Button>
    </div>
  );
};

export default ClassActions;
