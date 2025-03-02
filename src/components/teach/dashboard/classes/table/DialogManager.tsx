
import React from 'react';
import { CancelCourseDialog } from '../dialogs/CancelCourseDialog';
import { MessageDialog } from '../dialogs/MessageDialog';
import { ShareDialog } from '../dialogs/ShareDialog';
import { EditClassDialog } from '../dialogs/EditClassDialog';
import { ClassItem } from '@/types/class';

interface DialogManagerProps {
  dialogs: {
    editClassDialog: {
      isOpen: boolean;
      onClose: () => void;
      classData: ClassItem | null;
    };
    cancelDialog: {
      isOpen: boolean;
      onClose: () => void;
      classId: number | null;
    };
    messageDialog: {
      isOpen: boolean;
      onClose: () => void;
      classId: number | null;
    };
    shareDialog: {
      isOpen: boolean;
      onClose: () => void;
      classData: ClassItem | null;
    };
  };
}

const DialogManager = ({ dialogs }: DialogManagerProps) => {
  return (
    <>
      {dialogs.editClassDialog.isOpen && dialogs.editClassDialog.classData && (
        <EditClassDialog
          isOpen={dialogs.editClassDialog.isOpen}
          onClose={dialogs.editClassDialog.onClose}
          classData={dialogs.editClassDialog.classData}
        />
      )}
      
      {dialogs.cancelDialog.isOpen && dialogs.cancelDialog.classId && (
        <CancelCourseDialog
          isOpen={dialogs.cancelDialog.isOpen}
          onClose={dialogs.cancelDialog.onClose}
          classId={dialogs.cancelDialog.classId}
        />
      )}
      
      {dialogs.messageDialog.isOpen && dialogs.messageDialog.classId && (
        <MessageDialog
          isOpen={dialogs.messageDialog.isOpen}
          onClose={dialogs.messageDialog.onClose}
          classId={dialogs.messageDialog.classId}
        />
      )}
      
      {dialogs.shareDialog.isOpen && dialogs.shareDialog.classData && (
        <ShareDialog
          isOpen={dialogs.shareDialog.isOpen}
          onClose={dialogs.shareDialog.onClose}
          classData={dialogs.shareDialog.classData}
        />
      )}
    </>
  );
};

export default DialogManager;
