
import { Button } from "@/components/ui/button";
import { InstructorProfile } from "@/types/instructor";
import { Mail, Phone, MessageSquare } from "lucide-react";

interface ContactButtonsProps {
  instructor: InstructorProfile;
  onOpenMessageDialog: () => void;
}

const ContactButtons = ({ instructor, onOpenMessageDialog }: ContactButtonsProps) => {
  return (
    <div className="space-y-4">
      <Button 
        className="w-full flex items-center gap-2 justify-start bg-accent-purple hover:bg-accent-purple/90"
        onClick={onOpenMessageDialog}
      >
        <MessageSquare className="h-4 w-4" />
        Message {instructor.firstName}
      </Button>
      
      {instructor.email && (
        <Button 
          variant="outline"
          className="w-full flex items-center gap-2 justify-start"
          onClick={() => window.location.href = `mailto:${instructor.email}`}
        >
          <Mail className="h-4 w-4" />
          Email
        </Button>
      )}
      
      {instructor.phone && (
        <Button 
          variant="outline"
          className="w-full flex items-center gap-2 justify-start"
          onClick={() => window.location.href = `tel:${instructor.phone}`}
        >
          <Phone className="h-4 w-4" />
          Call
        </Button>
      )}
    </div>
  );
};

export default ContactButtons;
