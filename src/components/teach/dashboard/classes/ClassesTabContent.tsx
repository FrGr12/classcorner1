import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassesTable from "./ClassesTable";
import { ClassItem } from "@/types/class";
interface ClassesTabContentProps {
  classes: ClassItem[];
  onAction: (action: string, classId: number) => void;
}
const ClassesTabContent = ({
  classes,
  onAction
}: ClassesTabContentProps) => {
  return <Card>
      <CardHeader>
        <CardTitle className="text-base text-left">Your Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <ClassesTable classes={classes} onAction={onAction} />
      </CardContent>
    </Card>;
};
export default ClassesTabContent;