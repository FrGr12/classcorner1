
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";

interface ScheduleSectionProps {
  form: UseFormReturn<any>;
}

const ScheduleSection = ({ form }: ScheduleSectionProps) => {
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
          <Label className="text-base">Schedule Type</Label>
          {/* Form fields for schedule type, dates, times */}
        </div>
      </div>
    </Card>
  );
};

export default ScheduleSection;
