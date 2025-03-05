
import { useState } from "react";
import PromoteDialog from "../promote/PromoteDialog";
import ClassDetailsDialog from "../ClassDetailsDialog";
import MessageDialog from "../dialogs/MessageDialog";
import ShareDialog from "../dialogs/ShareDialog";
import EditClassDialog from "../dialogs/EditClassDialog";

interface DialogManagerProps {
  selectedClassId: number | null;
  isPromoteOpen: boolean;
  isMessageOpen: boolean;
  isShareOpen: boolean;
  isDetailsOpen: boolean;
  isEditOpen: boolean;
  setIsPromoteOpen: (open: boolean) => void;
  setIsMessageOpen: (open: boolean) => void;
  setIsShareOpen: (open: boolean) => void;
  setIsDetailsOpen: (open: boolean) => void;
  setIsEditOpen: (open: boolean) => void;
  onEditSuccess: () => void;
}

const DialogManager = ({
  selectedClassId,
  isPromoteOpen,
  isMessageOpen,
  isShareOpen,
  isDetailsOpen,
  isEditOpen,
  setIsPromoteOpen,
  setIsMessageOpen,
  setIsShareOpen,
  setIsDetailsOpen,
  setIsEditOpen,
  onEditSuccess
}: DialogManagerProps) => {
  return (
    <>
      <MessageDialog 
        open={isMessageOpen}
        onOpenChange={setIsMessageOpen}
        classId={selectedClassId}
      />

      <PromoteDialog 
        open={isPromoteOpen}
        onOpenChange={setIsPromoteOpen}
        classId={selectedClassId}
      />

      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        classId={selectedClassId}
      />

      <ClassDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        classId={selectedClassId}
      />

      <EditClassDialog 
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        classId={selectedClassId}
        onSuccess={onEditSuccess}
      />
    </>
  );
};

export default DialogManager;
