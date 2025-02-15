
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PromotionPricing from "./PromotionPricing";

interface PromoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

const PromoteDialog = ({ open, onOpenChange, classId }: PromoteDialogProps) => {
  if (!classId) return null;

  const handlePromotionComplete = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Promote Your Class</DialogTitle>
          <DialogDescription>
            Choose how you want to promote your class
          </DialogDescription>
        </DialogHeader>
        
        <PromotionPricing 
          courseId={classId}
          onPromotionComplete={handlePromotionComplete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PromoteDialog;
