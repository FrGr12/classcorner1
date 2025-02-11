
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Tag } from "lucide-react";
import CreateDiscountDialog from "../discounts/CreateDiscountDialog";
import { useState } from "react";
import { toast } from "sonner";

interface PromoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

const PromoteDialog = ({ open, onOpenChange, classId }: PromoteDialogProps) => {
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  const handleBoost = () => {
    toast.success("Opening boost feature...");
    onOpenChange(false);
  };

  const handleDiscountCreated = () => {
    setIsDiscountOpen(false);
    onOpenChange(false);
    toast.success("Discount created successfully");
  };

  if (!classId) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Promote Your Class</DialogTitle>
            <DialogDescription>
              Choose how you want to promote your class
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-20"
              onClick={() => setIsDiscountOpen(true)}
            >
              <Tag className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Create Discount</div>
                <div className="text-sm text-muted-foreground">
                  Offer special pricing to attract more students
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-20"
              onClick={handleBoost}
            >
              <Rocket className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Boost Visibility</div>
                <div className="text-sm text-muted-foreground">
                  Increase your class visibility in search results
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CreateDiscountDialog
        courseId={classId}
        open={isDiscountOpen}
        onOpenChange={setIsDiscountOpen}
        onDiscountCreated={handleDiscountCreated}
      />
    </>
  );
};

export default PromoteDialog;
