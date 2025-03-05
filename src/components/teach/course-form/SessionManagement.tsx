
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SessionsForm } from "@/components/teach/SessionsForm";

interface SessionManagementProps {
  sessions: any[];
  setSessions: (sessions: any[]) => void;
}

const SessionManagement = ({ sessions, setSessions }: SessionManagementProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Session Management</h3>
          <p className="text-sm text-muted-foreground">
            Add, edit or remove sessions for your class
          </p>
        </div>
        
        <Separator />
        
        <SessionsForm sessions={sessions} setSessions={setSessions} />
      </div>
    </Card>
  );
};

export default SessionManagement;
