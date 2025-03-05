
import { memo, useCallback } from "react";
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

// Memoize the component to prevent unnecessary re-renders
const SelectedClassCard = memo(({ selectedClass }: SelectedClassCardProps) => {
  const navigate = useNavigate();
  
  // Memoize the click handler
  const handleViewPublicPage = useCallback(() => {
    navigate(`/class/${selectedClass.id}`);
  }, [navigate, selectedClass.id]);
  
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewPublicPage}
          aria-label={`View public page for ${selectedClass.title}`}
        >
          <ArrowUpRight className="mr-2 h-4 w-4" aria-hidden="true" />
          View Public Page
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <ClassesTabs />
      </CardContent>
    </Card>
  );
});

// Add display name for debugging purposes
SelectedClassCard.displayName = 'SelectedClassCard';

export default SelectedClassCard;
