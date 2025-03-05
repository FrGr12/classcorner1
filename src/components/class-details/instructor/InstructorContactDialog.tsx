
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { ClassItem } from "@/types/class";
import { useLanguage } from "@/contexts/LanguageContext";

interface InstructorContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassItem;
}

const InstructorContactDialog = ({
  isOpen,
  onClose,
  classItem,
}: InstructorContactDialogProps) => {
  const { t } = useLanguage();
  
  const handleSendEmail = () => {
    window.location.href = `mailto:${classItem.instructorEmail || 'instructor@example.com'}`;
    onClose();
  };
  
  const handleCall = () => {
    window.location.href = `tel:${classItem.instructorPhone || '+1234567890'}`;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{t('instructor.contactTitle')}</DialogTitle>
          <DialogDescription className="text-sm">
            {t('instructor.contactDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            onClick={handleSendEmail}
          >
            <Mail className="h-4 w-4 mr-2" />
            {t('instructor.sendEmail')}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-sm"
            onClick={handleCall}
          >
            <Phone className="h-4 w-4 mr-2" />
            {t('instructor.call')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructorContactDialog;
