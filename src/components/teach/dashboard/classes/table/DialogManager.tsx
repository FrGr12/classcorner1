
import { useState } from 'react';
import ClassDetailsDialog from "../ClassDetailsDialog";
import EditClassDialog from "../dialogs/EditClassDialog";
import MessageDialog from "../dialogs/MessageDialog";
import ShareDialog from "../dialogs/ShareDialog";
// Import or comment out the problematic import
// import PromoteDialog from "../dialogs/PromoteDialog";
import CancelCourseDialog from "../dialogs/CancelCourseDialog";
import { ClassItem } from '@/types/class';

interface DialogManagerProps {
  selectedDialog: string | null;
  setSelectedDialog: (dialog: string | null) => void;
  selectedClassId: number | null;
  classData: ClassItem | null;
}

const DialogManager = ({ selectedDialog, setSelectedDialog, selectedClassId, classData }: DialogManagerProps) => {
  // Handler to close dialogs
  const handleCloseDialog = () => {
    setSelectedDialog(null);
  };

  if (!classData && selectedDialog !== 'details') {
    return null;
  }

  return (
    <>
      {/* Details Dialog */}
      {selectedDialog === 'details' && (
        <ClassDetailsDialog
          open={true}
          onOpenChange={handleCloseDialog}
          classId={selectedClassId}
        />
      )}

      {/* Edit Dialog */}
      {selectedDialog === 'edit' && classData && (
        <EditClassDialog
          open={true}
          onOpenChange={handleCloseDialog}
          classData={classData}
        />
      )}

      {/* Message Dialog */}
      {selectedDialog === 'message' && classData && (
        <MessageDialog
          open={true}
          onOpenChange={handleCloseDialog}
          classData={classData}
        />
      )}

      {/* Share Dialog */}
      {selectedDialog === 'share' && classData && (
        <ShareDialog
          open={true}
          onOpenChange={handleCloseDialog}
          classData={classData}
        />
      )}

      {/* Promote Dialog - Commented out as it has issues */}
      {/* {selectedDialog === 'promote' && classData && (
        <PromoteDialog
          open={true}
          onOpenChange={handleCloseDialog}
          classData={classData}
        />
      )} */}

      {/* Cancel Dialog */}
      {selectedDialog === 'cancel' && classData && (
        <CancelCourseDialog
          open={true}
          onOpenChange={handleCloseDialog}
          classData={classData}
        />
      )}
    </>
  );
};

export default DialogManager;
