
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface Group {
  id: number;
  name: string;
  type: string;
}

interface GroupsListProps {
  groups?: Group[];
  onGroupClick: (groupId: number) => void;
  onViewAllClick: () => void;
}

export const GroupsList = ({ groups, onGroupClick, onViewAllClick }: GroupsListProps) => {
  return (
    <div className="space-y-1">
      <div className="px-3 py-2 flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onViewAllClick}
          className="ml-auto"
        >
          View All
        </Button>
      </div>
      <nav className="space-y-1">
        {groups?.slice(0, 5).map(group => (
          <button
            key={group.id}
            onClick={() => onGroupClick(group.id)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors text-neutral-700"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{group.name}</span>
            </div>
            <span className="text-muted-foreground text-xs">
              {group.type === 'private' ? '🔒' : null}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};
