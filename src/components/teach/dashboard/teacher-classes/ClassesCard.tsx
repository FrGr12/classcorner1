
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ClassesTabs from "./ClassesTabs";
import { ClassItemLocal } from "./types";

interface ClassesCardProps {
  classes: ClassItemLocal[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  onAction: (action: string, classId: number) => void;
}

const ClassesCard = ({ classes, selectedTab, setSelectedTab, onAction }: ClassesCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
        <div className="space-y-0.5">
          <CardTitle>Your Classes</CardTitle>
          <CardDescription>
            Manage and organize your scheduled classes
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/dashboard/classes/create")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ClassesTabs 
          classes={classes}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onAction={onAction}
        />
      </CardContent>
    </Card>
  );
};

export default ClassesCard;
