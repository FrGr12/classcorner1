
import React from 'react';
import { EditClassDialog } from '../dialogs/EditClassDialog';
import CancelCourseDialog from '../dialogs/CancelCourseDialog';
import MessageDialog from '../dialogs/MessageDialog';
import ShareDialog from '../dialogs/ShareDialog';
import { ClassItem } from '@/types/class';

export interface DialogManagerProps {
  isEditOpen: boolean;
  isDetailsOpen: boolean;
  isPromoteOpen: boolean;
  isMessageOpen: boolean;
  isShareOpen: boolean;
  isCancelOpen?: boolean;
  selectedClassId: number;
  selectedClass?: ClassItem;
  setIsEditOpen: (open: boolean) => void;
  setIsDetailsOpen: (open: boolean) => void;
  setIsPromoteOpen: (open: boolean) => void;
  setIsMessageOpen: (open: boolean) => void;
  setIsShareOpen: (open: boolean) => void;
  setIsCancelOpen?: (open: boolean) => void;
  onEditSuccess: () => void;
}

const DialogManager: React.FC<DialogManagerProps> = ({
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
}) => {
  if (!selectedClass) return null;

  // Handle course cancellation
  const handleCancelConfirm = async (): Promise<boolean> => {
    try {
      // In a real implementation, this would call an API to cancel the course
      console.log(`Cancelling course ${selectedClassId}`);
      
      // Close the dialog after successful cancellation
      setIsCancelOpen(false);
      return true;
    } catch (error) {
      console.error('Error cancelling course:', error);
      return false;
    }
  };

  return (
    <>
      {isEditOpen && (
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

      {isCancelOpen && (
        <CancelCourseDialog
          open={isCancelOpen}
          onOpenChange={setIsCancelOpen}
          onConfirm={handleCancelConfirm}
        />
      )}
    </>
  );
};

export default DialogManager;
