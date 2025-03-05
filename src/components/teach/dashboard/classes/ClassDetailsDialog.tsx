
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useClassDetails } from "./details/useClassDetails";
import ClassDetailsTabs from "./details/ClassDetailsTabs";
import ClassDetails from "./card/ClassDetails";
import ClassActions from "./card/ClassActions";
import { useEffect } from "react";

interface ClassDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

const ClassDetailsDialog = ({ open, onOpenChange, classId }: ClassDetailsDialogProps) => {
  const { participants, waitlist, classDetails } = useClassDetails(classId, open);

  useEffect(() => {
    // Add analytics tracking when dialog opens
    if (open && classId) {
      console.log(`Viewing details for class ID: ${classId}`);
    }
  }, [open, classId]);

  if (!classId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{classDetails?.title || 'Class Details'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 md:grid-cols-[1fr_250px]">
          <div className="space-y-6">
            <ClassDetailsTabs participants={participants} waitlist={waitlist} />
          </div>
          <div className="space-y-6">
            {classDetails && (
              <>
                <ClassDetails 
                  date={classDetails.date}
                  duration={classDetails.duration?.toString() || "2 hours"}
                  price={classDetails.price}
                  participantsCount={0}
                  maxParticipants={classDetails.maxParticipants}
                />

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Class Actions</h3>
                  <ClassActions 
                    classId={classId} 
                    category={classDetails.category || 'art'} 
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailsDialog;
