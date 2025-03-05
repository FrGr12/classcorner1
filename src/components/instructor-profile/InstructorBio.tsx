
import { InstructorProfile } from "@/types/instructor";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InstructorBioProps {
  instructor: InstructorProfile;
  className?: string;
  compact?: boolean;
}

const InstructorBio = ({
  instructor,
  className = "",
  compact = false
}: InstructorBioProps) => {
  const [expanded, setExpanded] = useState(!compact);
  const { t } = useLanguage();
  
  // Determine if we should show the expand/collapse button
  const bioLength = instructor.bio ? instructor.bio.length : 0;
  const shouldShowToggle = compact && bioLength > 150;
  
  // Get truncated or full bio based on expanded state
  const displayBio = shouldShowToggle && !expanded 
    ? `${instructor.bio?.substring(0, 150)}...` 
    : instructor.bio || t("instructor.noBio");

  return (
    <div className={`glass-panel rounded-xl p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-left">{t("instructor.about")}</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-neutral-700 leading-relaxed text-left">
            {displayBio}
          </p>
          
          {shouldShowToggle && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-accent-purple flex items-center gap-1 px-2 py-1 h-auto"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span>{t("instructor.showLess")}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span>{t("instructor.readMore")}</span>
                </>
              )}
            </Button>
          )}
        </div>
        
        {(expanded || !compact) && (
          <>
            {instructor.teachingExperience && (
              <div>
                <h3 className="font-semibold text-lg text-left">{t("instructor.experience")}</h3>
                <p className="text-neutral-700 text-left">{instructor.teachingExperience}</p>
              </div>
            )}
            
            {instructor.expertise && instructor.expertise.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg text-left">{t("instructor.expertise")}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {instructor.expertise.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InstructorBio;
