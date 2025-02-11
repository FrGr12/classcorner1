
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScheduleSectionProps {
  sessionDate: string;
  setSessionDate: (date: string) => void;
}

const ScheduleSection = ({ sessionDate, setSessionDate }: ScheduleSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="reschedule">Reschedule Class</Label>
      <Input
        id="reschedule"
        type="datetime-local"
        value={sessionDate}
        onChange={(e) => setSessionDate(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default ScheduleSection;
