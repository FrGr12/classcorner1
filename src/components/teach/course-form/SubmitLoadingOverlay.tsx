
import { Loader2 } from "lucide-react";

interface SubmitLoadingOverlayProps {
  isSubmitting: boolean;
}

const SubmitLoadingOverlay = ({ isSubmitting }: SubmitLoadingOverlayProps) => {
  if (!isSubmitting) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg flex items-center gap-3">
        <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
        <p className="text-base sm:text-lg">Processing your request...</p>
      </div>
    </div>
  );
};

export default SubmitLoadingOverlay;
