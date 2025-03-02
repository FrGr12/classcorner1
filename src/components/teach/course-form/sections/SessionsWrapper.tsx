
import { SessionsForm } from "@/components/teach/SessionsForm";

interface SessionsWrapperProps {
  sessions: any[];
  setSessions: (sessions: any[]) => void;
}

const SessionsWrapper = ({ sessions, setSessions }: SessionsWrapperProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium mb-4">Class Sessions</h3>
      <SessionsForm 
        sessions={sessions} 
        setSessions={setSessions} 
      />
    </div>
  );
};

export default SessionsWrapper;
