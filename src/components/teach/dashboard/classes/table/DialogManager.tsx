
import React from "react";
import ClassDetailsDialog from "../ClassDetailsDialog";
import { EditClassDialog } from "../dialogs/EditClassDialog";
import MessageDialog from "../dialogs/MessageDialog";
import ShareDialog from "../dialogs/ShareDialog";
import CancelCourseDialog from "../dialogs/CancelCourseDialog";
import { ClassItem } from "@/types/class";

// Get class by ID from mock or API
const getClassById = (classId: number | null): ClassItem | null => {
  if (!classId) return null;
  
  // In a real app, this would fetch from API or state
  // For demo, return a mock class
  return {
    id: classId,
    title: "Demo Class",
    instructor: "Jane Smith",
    price: 49.99,
    rating: 4.5,
    images: ["/placeholder.svg"],
    level: "beginner",
    date: new Date(),
    city: "New York",
    category: "arts",
    description: "A demo class for testing purposes"
  };
};

interface DialogManagerProps {
  selectedClassId: number | null;
  isDetailsOpen: boolean;
  isEditOpen: boolean;
  isMessageOpen: boolean;
  isShareOpen: boolean;
  isPromoteOpen: boolean;
  setIsDetailsOpen: (isOpen: boolean) => void;
  setIsEditOpen: (isOpen: boolean) => void;
  setIsMessageOpen: (isOpen: boolean) => void;
  setIsShareOpen: (isOpen: boolean) => void;
  setIsPromoteOpen: (isOpen: boolean) => void;
  onEditSuccess: () => void;
}

const DialogManager = ({
  selectedClassId,
  isDetailsOpen,
  isEditOpen,
  isMessageOpen,
  isShareOpen,
  isPromoteOpen,
  setIsDetailsOpen,
  setIsEditOpen,
  setIsMessageOpen,
  setIsShareOpen,
  setIsPromoteOpen,
  onEditSuccess
}: DialogManagerProps) => {
  const selectedClass = getClassById(selectedClassId);

  if (!selectedClass) return null;

  return (
    <>
      {isDetailsOpen && (
        <ClassDetailsDialog
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          classId={selectedClass.id}
        />
      )}

      {isEditOpen && (
        <EditClassDialog
          classData={selectedClass}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSuccess={onEditSuccess}
        />
      )}

      {isMessageOpen && (
        <MessageDialog
          classId={selectedClass.id}
          open={isMessageOpen}
          onOpenChange={setIsMessageOpen}
        />
      )}

      {isShareOpen && (
        <ShareDialog
          classId={selectedClass.id}
          open={isShareOpen}
          onOpenChange={setIsShareOpen}
        />
      )}

      {/* Temporarily commenting out since it can't be found */}
      {/* {isPromoteOpen && (
        <PromoteDialog
          classId={selectedClass.id}
          open={isPromoteOpen}
          onOpenChange={setIsPromoteOpen}
        />
      )} */}
      
      {/* {isPromoteOpen && (
        <CancelCourseDialog
          classId={selectedClass.id}
          open={isPromoteOpen}
          onOpenChange={setIsPromoteOpen}
        />
      )} */}
    </>
  );
};

export default DialogManager;
