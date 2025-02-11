
import { Card, CardContent } from "@/components/ui/card";
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
      <CardContent className="p-4">
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
