
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import ClassesTabs from "../classes/ClassesTabs";
import { ClassItemLocal } from "./types";
import { useNavigate } from "react-router-dom";

interface SelectedClassCardProps {
  selectedClass: ClassItemLocal;
}

const SelectedClassCard = ({ selectedClass }: SelectedClassCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl">{selectedClass.title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {selectedClass.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {selectedClass.duration}
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(`/class/${selectedClass.id}`)}>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          View Public Page
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <ClassesTabs />
      </CardContent>
    </Card>
  );
};

export default SelectedClassCard;
