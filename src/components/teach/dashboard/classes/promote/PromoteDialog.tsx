
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PromotionPricing from "./PromotionPricing";

interface PromoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
  promotionType?: 'boost' | 'sponsor' | 'outreach';
}

const PromoteDialog = ({ open, onOpenChange, classId, promotionType }: PromoteDialogProps) => {
  if (!classId) return null;

  const getTitleAndDescription = () => {
    switch (promotionType) {
      case 'boost':
        return {
          title: "Boost Your Class",
          description: "Increase your class visibility for a short period"
        };
      case 'sponsor':
        return {
          title: "Sponsor Your Class",
          description: "Feature your class at the top of search results"
        };
      case 'outreach':
        return {
          title: "Student Outreach",
          description: "Connect with potential students directly"
        };
      default:
        return {
          title: "Promote Your Class",
          description: "Choose how you want to promote your class"
        };
    }
  };

  const { title, description } = getTitleAndDescription();

  const handlePromotionComplete = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <PromotionPricing 
          courseId={classId}
          promotionType={promotionType}
          onPromotionComplete={handlePromotionComplete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PromoteDialog;
