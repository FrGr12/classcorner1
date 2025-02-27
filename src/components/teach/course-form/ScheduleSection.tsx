
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SessionsForm } from "@/components/teach/SessionsForm";

const ScheduleSection = ({ 
  sessions,
  setSessions
}: { 
  sessions: any[];
  setSessions: (sessions: any[]) => void;
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Class Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Set up your class date(s) and time(s).
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <Label className="text-base">Session Details</Label>
          <SessionsForm sessions={sessions} setSessions={setSessions} />
        </div>
      </div>
    </Card>
  );
};

export default ScheduleSection;
