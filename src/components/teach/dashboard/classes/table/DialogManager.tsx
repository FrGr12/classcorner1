
import React, { memo } from 'react';
import { EditClassDialog } from '../dialogs/EditClassDialog';
import CancelCourseDialog from '../dialogs/CancelCourseDialog';
import MessageDialog from '../dialogs/MessageDialog';
import ShareDialog from '../dialogs/ShareDialog';
import { ClassItem } from '@/types/class';
import { toast } from 'sonner';

export interface DialogManagerProps {
  isEditOpen: boolean;
  isDetailsOpen: boolean;
  isPromoteOpen: boolean;
  isMessageOpen: boolean;
  isShareOpen: boolean;
  isCancelOpen?: boolean;
  selectedClassId: number | null;
  selectedClass?: ClassItem | null;
  setIsEditOpen: (open: boolean) => void;
  setIsDetailsOpen: (open: boolean) => void;
  setIsPromoteOpen: (open: boolean) => void;
  setIsMessageOpen: (open: boolean) => void;
  setIsShareOpen: (open: boolean) => void;
  setIsCancelOpen?: (open: boolean) => void;
  onEditSuccess: () => void;
}

const DialogManager = memo(({
  isEditOpen,
  isDetailsOpen,
  isPromoteOpen,
  isMessageOpen,
  isShareOpen,
  isCancelOpen = false,
  selectedClassId,
  selectedClass,
  setIsEditOpen,
  setIsDetailsOpen,
  setIsPromoteOpen,
  setIsMessageOpen,
  setIsShareOpen,
  setIsCancelOpen = () => {},
  onEditSuccess
}: DialogManagerProps) => {
  if (!selectedClassId) return null;

  // Handle course cancellation
  const handleCancelConfirm = async (): Promise<boolean> => {
    try {
      // In a real implementation, this would call an API to cancel the course
      console.log(`Cancelling course ${selectedClassId}`);
      
      toast.success("Class successfully cancelled", {
        description: "Notification has been sent to all registered participants"
      });
      
      // Close the dialog after successful cancellation
      setIsCancelOpen(false);
      return true;
    } catch (error) {
      console.error('Error cancelling course:', error);
      toast.error("Failed to cancel class", {
        description: "Please try again or contact support"
      });
      return false;
    }
  };

  const handlePromote = () => {
    // This would handle the promote dialog action
    toast.success("Promotion activated", {
      description: "Your class will now receive increased visibility"
    });
    setIsPromoteOpen(false);
  };

  const handleShare = () => {
    // This would handle the share dialog action
    toast.success("Class shared successfully", {
      description: "Your class link has been copied to clipboard"
    });
    setIsShareOpen(false);
  };

  return (
    <div aria-live="polite">
      {isEditOpen && selectedClass && (
        <EditClassDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          classData={selectedClass}
          onSuccess={onEditSuccess}
        />
      )}

      {isMessageOpen && (
        <MessageDialog
          open={isMessageOpen}
          onOpenChange={setIsMessageOpen}
          classId={selectedClassId}
        />
      )}

      {isShareOpen && (
        <ShareDialog
          open={isShareOpen}
          onOpenChange={setIsShareOpen}
          classId={selectedClassId}
        />
      )}

      {isPromoteOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Promote Class</h2>
            <p className="mb-6">Boost visibility for class #{selectedClassId}</p>
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 rounded bg-muted" 
                onClick={() => setIsPromoteOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded bg-primary text-primary-foreground"
                onClick={handlePromote}
              >
                Boost Now
              </button>
            </div>
          </div>
        </div>
      )}

      {isCancelOpen && (
        <CancelCourseDialog
          open={isCancelOpen}
          onOpenChange={setIsCancelOpen}
          onConfirm={handleCancelConfirm}
        />
      )}
    </div>
  );
});

DialogManager.displayName = 'DialogManager';

export default DialogManager;
