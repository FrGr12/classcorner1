
import { SessionsForm } from "@/components/teach/SessionsForm";
import { Card } from "@/components/ui/card";

interface SessionsWrapperProps {
  sessions: any[];
  setSessions: (sessions: any[]) => void;
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
          aria-labelledby="sessions-heading"
        />
      </div>
    </Card>
  );
};

export default SessionsWrapper;
