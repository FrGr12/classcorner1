
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClassActionsProps {
  classId: number;
  onEdit: (e: React.MouseEvent) => void;
  onMessage: (e: React.MouseEvent) => void;
  onPromote: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
}

const ClassActions = ({ onEdit, onMessage, onPromote, onShare }: ClassActionsProps) => {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-accent-purple/10"
          >
            <MoreHorizontal className="h-4 w-4 text-accent-purple" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuItem onClick={onEdit} className="text-xs sm:text-sm">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onMessage} className="text-xs sm:text-sm">
            Message
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onPromote} className="text-xs sm:text-sm">
            Promote
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShare} className="text-xs sm:text-sm">
            Share
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ClassActions;
