
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { ClassItem } from "@/types/class";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassItem;
}

const ContactDialog = ({
  isOpen,
  onClose,
  classItem
}: ContactDialogProps) => {
  const handleSendEmail = () => {
    window.location.href = `mailto:${classItem.instructorEmail}`;
    onClose();
  };
  
  const handleCall = () => {
    window.location.href = `tel:${classItem.instructorPhone}`;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-labelledby="contact-dialog-title" aria-describedby="contact-dialog-description">
        <DialogHeader>
          <DialogTitle id="contact-dialog-title">Contact Instructor</DialogTitle>
          <DialogDescription id="contact-dialog-description">
            Get in touch with the instructor through your preferred method.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={handleSendEmail} 
            aria-label={`Send email to ${classItem.instructor}`}
          >
            <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
            Send Email
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={handleCall} 
            aria-label={`Call ${classItem.instructor}`}
          >
            <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
            Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
