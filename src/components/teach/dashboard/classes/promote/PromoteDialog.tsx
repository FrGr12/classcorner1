
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PromotionPricing from "./PromotionPricing";

interface PromoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
  promotionType?: 'boost' | 'sponsor' | 'outreach';
}

const PromoteDialog = ({ open, onOpenChange, classId, promotionType }: PromoteDialogProps) => {
  const getTitleAndDescription = () => {
    const scope = classId ? "Your Class" : "All Classes";
    
    switch (promotionType) {
      case 'boost':
        return {
          title: `Boost ${scope}`,
          description: `Increase visibility for ${classId ? "your class" : "all your classes"} for a short period`
        };
      case 'sponsor':
        return {
          title: `Sponsor ${scope}`,
          description: `Feature ${classId ? "your class" : "all your classes"} at the top of search results`
        };
      case 'outreach':
        return {
          title: "Student Outreach",
          description: "Connect with potential students directly"
        };
      default:
        return {
          title: "Promote Your Classes",
          description: "Choose how you want to promote your classes"
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
