
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CourseFormValues } from "../CourseFormContext";
import { useCourseForm } from "../CourseFormContext";

interface ScheduleSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const ScheduleSection = ({ form }: ScheduleSectionProps) => {
  const { sessions, setSessions } = useCourseForm();
  
  const handleAddSession = () => {
    const newSession = {
      id: Date.now(),
      date: new Date(),
      start_time: "",
      end_time: "",
    };
    
    setSessions([...sessions, newSession]);
  };
  
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium" id="schedule-heading">Class Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Set up your class date(s) and time(s).
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <Label className="text-base">Schedule Type</Label>
          {/* Form fields for schedule type, dates, times */}
          <div className="flex justify-end">
            <Button 
              type="button" 
              variant="default"
              size="sm"
              className="mt-2"
              onClick={handleAddSession}
              aria-label="Add new session"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleSection;
