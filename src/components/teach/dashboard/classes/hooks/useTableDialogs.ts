
import { useState } from "react";

export const useTableDialogs = (onAction: (action: string, classId: number) => void) => {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);

  const handleEditSuccess = () => {
    if (selectedClassId) {
      onAction("edit_success", selectedClassId);
    }
    setSelectedDialog(null);
  };

  return {
    selectedClassId,
    setSelectedClassId,
    selectedDialog,
    setSelectedDialog,
    handleEditSuccess
  };
};
