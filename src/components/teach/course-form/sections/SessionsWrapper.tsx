
import { SessionsForm } from "@/components/teach/SessionsForm";
import { Card } from "@/components/ui/card";
import { Session } from "@/types/session";

interface SessionsWrapperProps {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const SessionsWrapper = ({ sessions, setSessions }: SessionsWrapperProps) => {
  return (
    <Card className="p-6 mt-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium" id="sessions-heading">Class Sessions</h3>
          <p className="text-sm text-muted-foreground">
            Manage individual sessions for your class
          </p>
        </div>
        
        <SessionsForm 
          sessions={sessions} 
          setSessions={setSessions} 
        />
      </div>
    </Card>
  );
};

export default SessionsWrapper;
