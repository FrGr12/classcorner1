
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstructorProfile } from "@/types/instructor";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactButtonsProps {
  instructor: InstructorProfile;
  onOpenMessageDialog: () => void;
}

const ContactButtons = ({ 
  instructor,
  onOpenMessageDialog
}: ContactButtonsProps) => {
  const { t } = useLanguage();
  
  const handleEmailClick = () => {
    window.location.href = `mailto:${instructor.email}`;
  };

  const handlePhoneClick = () => {
    if (instructor.phone) {
      window.location.href = `tel:${instructor.phone}`;
    }
  };

  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full justify-start"
        onClick={onOpenMessageDialog}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {t("instructor.contact")}
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full justify-start"
        onClick={handleEmailClick}
      >
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      
      {instructor.phone && (
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handlePhoneClick}
        >
          <Phone className="h-4 w-4 mr-2" />
          {instructor.phone}
        </Button>
      )}
    </div>
  );
};

export default ContactButtons;
