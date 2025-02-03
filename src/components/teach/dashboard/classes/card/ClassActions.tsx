import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Edit } from "lucide-react";
import CreateDiscountDialog from "../discounts/CreateDiscountDialog";
import SocialShare from "./SocialShare";
import InstantBoost from "./InstantBoost";

interface ClassActionsProps {
  classId: number;
  category: string;
}

const ClassActions = ({ classId, category }: ClassActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        size="sm"
        className="w-full"
        onClick={() => navigate(`/teach/crm?courseId=${classId}`)}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Message Participants
      </Button>

      <CreateDiscountDialog courseId={classId} />
      
      <InstantBoost courseId={classId} />
      
      <SocialShare courseId={classId} category={category} />

      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate(`/teach/classes/${classId}/edit`)}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit Class Details
      </Button>

      <Button
        variant="default"
        className="w-full"
        onClick={() => navigate(`/teach/classes/${classId}`)}
      >
        Full Class Management
      </Button>
    </div>
  );
};

export default ClassActions;