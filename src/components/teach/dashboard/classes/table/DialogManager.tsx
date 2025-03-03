
import React from 'react';
import { EditClassDialog } from '../dialogs/EditClassDialog';
import { MessageDialog } from '../dialogs/MessageDialog';
import { ShareDialog } from '../dialogs/ShareDialog';
import { CancelCourseDialog } from '../dialogs/CancelCourseDialog';
import { ClassItem } from '@/types/class';

interface DialogManagerProps {
  isEditDialogOpen: boolean;
  isMessageDialogOpen: boolean;
  isShareDialogOpen: boolean;
  isCancelDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsMessageDialogOpen: (isOpen: boolean) => void;
  setIsShareDialogOpen: (isOpen: boolean) => void;
  setIsCancelDialogOpen: (isOpen: boolean) => void;
  selectedClass: ClassItem | null;
}

export const DialogManager: React.FC<DialogManagerProps> = ({
  isEditDialogOpen,
  isMessageDialogOpen,
  isShareDialogOpen,
  isCancelDialogOpen,
  setIsEditDialogOpen,
  setIsMessageDialogOpen,
  setIsShareDialogOpen,
  setIsCancelDialogOpen,
  selectedClass
}) => {
  if (!selectedClass) return null;

  return (
    <>
      {isEditDialogOpen && (
        <EditClassDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          classData={selectedClass}
        />
      )}

      {isMessageDialogOpen && (
        <MessageDialog
          isOpen={isMessageDialogOpen}
          onClose={() => setIsMessageDialogOpen(false)}
          classData={selectedClass}
        />
      )}

      {isShareDialogOpen && (
        <ShareDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          classData={selectedClass}
        />
      )}

      {isCancelDialogOpen && (
        <CancelCourseDialog
          isOpen={isCancelDialogOpen}
          onClose={() => setIsCancelDialogOpen(false)}
          classData={selectedClass}
        />
      )}
    </>
  );
};
