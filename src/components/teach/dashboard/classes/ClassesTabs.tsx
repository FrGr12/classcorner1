
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassItem } from "@/types/class";
import ClassesTabContent from "./ClassesTabContent";
import AttendanceTracking from "../AttendanceTracking";
import TeacherWaitlist from "@/pages/TeacherWaitlist";

interface ClassesTabsProps {
  classes: ClassItem[];
  onAction: (action: string, classId: number) => void;
}

const ClassesTabs = ({ classes, onAction }: ClassesTabsProps) => {
  return (
    <Tabs defaultValue="classes" className="space-y-4">
      <TabsList>
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
      </TabsList>

      <TabsContent value="classes">
        <ClassesTabContent classes={classes} onAction={onAction} />
      </TabsContent>

      <TabsContent value="attendance">
        <AttendanceTracking />
      </TabsContent>

      <TabsContent value="waitlist">
        <TeacherWaitlist />
      </TabsContent>
    </Tabs>
  );
};

export default ClassesTabs;
