
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { InstructorProfile } from "@/types/instructor";
import InstructorBadge from "./InstructorBadge";
import { useLanguage } from "@/contexts/LanguageContext";

interface InstructorHeaderProps {
  instructor: InstructorProfile;
}

const InstructorHeader = ({ instructor }: InstructorHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="glass-panel rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
      <Avatar className="w-24 h-24 sm:w-32 sm:h-32 ring-2 ring-offset-2 ring-offset-white ring-accent-purple/20">
        <AvatarImage src={instructor.avatar} alt={instructor.displayName} />
        <AvatarFallback className="text-xl sm:text-2xl font-semibold text-accent-purple bg-accent-purple/10">
          {instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="space-y-2 sm:space-y-4 text-center sm:text-left">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold">{instructor.displayName}</h1>
            {instructor.classification && (
              <InstructorBadge classification={instructor.classification} />
            )}
          </div>
          <p className="text-neutral-600 mt-1">{instructor.location}</p>
        </div>
        
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-1.5" />
            <span className="font-medium">{instructor.averageRating.toFixed(1)}</span>
            <span className="text-neutral-500 ml-1">({instructor.totalReviews} reviews)</span>
          </div>
          
          <div>
            <span className="font-medium">{instructor.totalClasses}</span>
            <span className="text-neutral-500 ml-1">{t("stats.classes")}</span>
          </div>
          
          <div>
            <span className="font-medium">{instructor.totalStudents}</span>
            <span className="text-neutral-500 ml-1">{t("stats.students")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorHeader;
