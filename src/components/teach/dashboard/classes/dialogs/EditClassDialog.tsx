
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditClassFormFields from "./EditClassFormFields";
import CancelCourseDialog from "./CancelCourseDialog";
import { useEditClassForm } from "./hooks/useEditClassForm";

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
  onSuccess?: () => void;
}

const EditClassDialog = ({ 
  open, 
  onOpenChange, 
  classId, 
  onSuccess 
}: EditClassDialogProps) => {
  const {
    form,
    loading,
    showCancelDialog,
    setShowCancelDialog,
    onSubmit,
    handleCancelCourse
  } = useEditClassForm(classId, onSuccess);

  const handleSubmit = async (values) => {
    const success = await onSubmit(values);
    if (success) {
      onOpenChange(false);
    }
  };

  const confirmCancelCourse = async () => {
    const success = await handleCancelCourse();
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update class details or manage scheduling
            </DialogDescription>
          </DialogHeader>

          <EditClassFormFields
            form={form}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            onCancelCourse={() => setShowCancelDialog(true)}
          />
        </DialogContent>
      </Dialog>

      <CancelCourseDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={confirmCancelCourse}
      />
    </>
  );
};

export default EditClassDialog;
