
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { SessionsForm } from "@/components/teach/SessionsForm";
import { Session } from "@/types/session";

interface ScheduleSectionProps {
  form: UseFormReturn<any>;
}

const ScheduleSection = ({ form }: ScheduleSectionProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <SessionsForm
          sessions={form.watch("sessions") || []}
          setSessions={(sessions: Session[]) => form.setValue("sessions", sessions)}
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleSection;
