
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
    description: "A demo class for testing purposes" // Adding required description field
  };
};

interface DialogManagerProps {
  selectedClassId: number | null;
  isPromoteOpen: boolean;
  isMessageOpen: boolean;
  isShareOpen: boolean;
  isDetailsOpen: boolean;
  isEditOpen: boolean;
  setIsPromoteOpen: (isOpen: boolean) => void;
  setIsMessageOpen: (isOpen: boolean) => void;
  setIsShareOpen: (isOpen: boolean) => void;
  setIsDetailsOpen: (isOpen: boolean) => void;
  setIsEditOpen: (isOpen: boolean) => void;
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
  const selectedClass = getClassById(selectedClassId);

  if (!selectedClass) return null;

  return (
    <>
      {isDetailsOpen && (
        <ClassDetailsDialog
          classData={selectedClass}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
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
          classData={selectedClass}
          open={isShareOpen}
          onOpenChange={setIsShareOpen}
        />
      )}

      {isPromoteOpen && (
        {/* Temporarily commenting out PromoteDialog since it can't be found */}
        {/* <PromoteDialog
          classData={selectedClass}
          open={isPromoteOpen}
          onOpenChange={setIsPromoteOpen}
        /> */}
      )}
      
      {/* CancelCourseDialog temporarily commented out */}
      {/* {isPromoteOpen && (
        <CancelCourseDialog
          classData={selectedClass}
          open={isPromoteOpen}
          onOpenChange={setIsPromoteOpen}
        />
      )} */}
    </>
  );
};

export default DialogManager;
