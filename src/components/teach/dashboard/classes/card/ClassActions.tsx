
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
    <div className="flex gap-2 items-center justify-start">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate(`/teach/crm?courseId=${classId}`)}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Message
      </Button>

      <CreateDiscountDialog courseId={classId} />
      
      <InstantBoost courseId={classId} />
      
      <SocialShare courseId={classItem.id} category={category} />

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/teach/classes/${classId}/edit`)}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </div>
  );
};

export default ClassActions;

