
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

// Type definitions for dialog components
interface MessageDialogProps {
  open: boolean;
  onClose: () => void;
  classData: ClassItem;
}

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  classData: ClassItem;
}

interface CancelCourseDialogProps {
  open: boolean;
  onClose: () => void;
  classData: ClassItem;
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

  return (
    <>
      {isEditOpen && (
        <EditClassDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          classData={selectedClass}
        />
      )}

      {isMessageOpen && (
        <MessageDialog
          open={isMessageOpen}
          onClose={() => setIsMessageOpen(false)}
          classData={selectedClass}
        />
      )}

      {isShareOpen && (
        <ShareDialog
          open={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          classData={selectedClass}
        />
      )}

      {isCancelOpen && setIsCancelOpen && (
        <CancelCourseDialog
          open={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          classData={selectedClass}
        />
      )}
    </>
  );
};

export default DialogManager;
