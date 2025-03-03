
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useClassDetails } from "./details/useClassDetails";
import ClassDetailsTabs from "./details/ClassDetailsTabs";

interface ClassDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

const ClassDetailsDialog = ({ open, onOpenChange, classId }: ClassDetailsDialogProps) => {
  const { participants, waitlist, classDetails } = useClassDetails(classId, open);

  // Don't render anything if no classId is provided
  if (!classId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{classDetails?.title || 'Class Details'}</DialogTitle>
        </DialogHeader>
        
        <ClassDetailsTabs participants={participants || []} waitlist={waitlist || []} />
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailsDialog;
