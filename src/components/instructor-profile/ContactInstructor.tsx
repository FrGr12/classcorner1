
import { useState } from "react";
import { InstructorProfile } from "@/types/instructor";
import MessageDialog from "./contact/MessageDialog";
import ContactButtons from "./contact/ContactButtons";
import SocialLinks from "./contact/SocialLinks";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactInstructorProps {
  instructor: InstructorProfile;
}

const ContactInstructor = ({ instructor }: ContactInstructorProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <ErrorBoundary>
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">{t("instructor.contact")}</h2>
        
        <ContactButtons 
          instructor={instructor} 
          onOpenMessageDialog={() => setIsMessageOpen(true)} 
        />
        
        <SocialLinks instructor={instructor} />
      </div>
      
      <MessageDialog 
        isOpen={isMessageOpen}
        onOpenChange={setIsMessageOpen}
        instructor={instructor}
      />
    </ErrorBoundary>
  );
};

export default ContactInstructor;
