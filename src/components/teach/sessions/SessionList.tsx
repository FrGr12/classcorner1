
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Session } from "@/types/session";
import { format } from "date-fns";

interface SessionListProps {
  sessions: Session[];
  onRemoveSession: (id: number) => void;
}

const SessionList = ({ sessions, onRemoveSession }: SessionListProps) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Scheduled Sessions</h3>
      <div className="space-y-2">
        {sessions.map((session) => (
          <SessionItem 
            key={session.id} 
            session={session} 
            onRemove={onRemoveSession} 
          />
        ))}
      </div>
    </div>
  );
};

interface SessionItemProps {
  session: Session;
  onRemove: (id: number) => void;
}

const SessionItem = ({ session, onRemove }: SessionItemProps) => {
  return (
    <div
      className="flex items-center justify-between p-2 bg-muted rounded-md"
    >
      <div>
        <p className="font-medium">
          {typeof session.date === 'string' 
            ? format(new Date(session.date), "PPP") 
            : format(session.date as Date, "PPP")}
        </p>
        <p className="text-sm text-muted-foreground">
          {session.start_time} - {session.end_time || "TBD"}
          {session.is_recurring && ` (${session.recurrence_pattern})`}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(session.id)}
        aria-label="Remove session"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SessionList;
