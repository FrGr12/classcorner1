
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import SessionManagement from "@/components/teach/course-form/SessionManagement";
import { Session } from "@/types/session";

interface ScheduleSectionProps {
  form: UseFormReturn<any>;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const ScheduleSection = ({ form, sessions, setSessions }: ScheduleSectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-medium">Session Schedule</h3>
        </div>
        <SessionManagement
          form={form}
          sessions={sessions}
          setSessions={setSessions}
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleSection;
