
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ClassCard from "@/components/landing/ClassCard";
import { ClassPreview } from "../types";

interface ClassSectionProps {
  title: string;
  classes: ClassPreview[];
  emptyMessage: string;
  viewAllPath: string;
}

const ClassSection = ({ title, classes, emptyMessage, viewAllPath }: ClassSectionProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button 
          variant="ghost" 
          className="text-accent-purple"
          onClick={() => navigate(viewAllPath)}
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {classes.length > 0 ? (
          classes.map(classItem => (
            <ClassCard key={classItem.id} {...classItem} />
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">
            {emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassSection;
