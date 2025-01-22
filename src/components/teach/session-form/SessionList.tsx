import { format } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/session";

interface SessionListProps {
  sessions: Session[];
  removeSession: (index: number) => void;
}

const SessionList = ({ sessions, removeSession }: SessionListProps) => {
  if (sessions.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Scheduled Sessions</h4>
      <div className="space-y-2">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-muted rounded-lg"
          >
            <div className="flex-1">
              <p className="text-sm">
                {format(session.start, "PPP 'at' h:mm a")}
                {session.isRecurring && (
                  <span className="ml-2 text-muted-foreground">
                    (Recurring {session.recurrencePattern})
                  </span>
                )}
              </p>
              {session.isRecurring && (session.recurrenceCount || session.recurrenceEndDate) && (
                <p className="text-xs text-muted-foreground mt-1">
                  Ends{" "}
                  {session.recurrenceCount
                    ? `after ${session.recurrenceCount} occurrences`
                    : `on ${format(session.recurrenceEndDate!, "PPP")}`}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeSession(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionList;