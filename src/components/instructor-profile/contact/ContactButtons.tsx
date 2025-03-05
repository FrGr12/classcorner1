
import { Button } from "@/components/ui/button";
import { InstructorProfile } from "@/types/instructor";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ContactButtonsProps {
  instructor: InstructorProfile;
  onOpenMessageDialog: () => void;
}

const ContactButtons = ({ instructor, onOpenMessageDialog }: ContactButtonsProps) => {
  const { toast } = useToast();

  const handleEmailClick = () => {
    if (instructor.email) {
      window.location.href = `mailto:${instructor.email}`;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email address not available"
      });
    }
  };

  const handlePhoneClick = () => {
    if (instructor.phone) {
      window.location.href = `tel:${instructor.phone}`;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Phone number not available"
      });
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        className="w-full flex items-center gap-2 justify-start bg-accent-purple hover:bg-accent-purple/90"
        onClick={onOpenMessageDialog}
        aria-label={`Send a message to ${instructor.firstName}`}
      >
        <MessageSquare className="h-4 w-4" />
        <span>Message {instructor.firstName}</span>
      </Button>
      
      {instructor.email && (
        <Button 
          variant="outline"
          className="w-full flex items-center gap-2 justify-start"
          onClick={handleEmailClick}
          aria-label={`Email ${instructor.firstName} at ${instructor.email}`}
        >
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </Button>
      )}
      
      {instructor.phone && (
        <Button 
          variant="outline"
          className="w-full flex items-center gap-2 justify-start"
          onClick={handlePhoneClick}
          aria-label={`Call ${instructor.firstName} at ${instructor.phone}`}
        >
          <Phone className="h-4 w-4" />
          <span>Call</span>
        </Button>
      )}
    </div>
  );
};

export default ContactButtons;
