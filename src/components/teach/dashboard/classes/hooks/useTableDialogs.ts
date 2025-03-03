
import { useState } from "react";

export const useTableDialogs = (onAction: (action: string, classId: number) => void) => {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditSuccess = () => {
    if (selectedClassId !== null) {
      onAction('edit', selectedClassId);
    }
  };

  return {
    selectedClassId,
    setSelectedClassId,
    isPromoteOpen,
    setIsPromoteOpen,
    isMessageOpen,
    setIsMessageOpen,
    isShareOpen,
    setIsShareOpen,
    isDetailsOpen,
    setIsDetailsOpen,
    isEditOpen,
    setIsEditOpen,
    handleEditSuccess
  };
};
