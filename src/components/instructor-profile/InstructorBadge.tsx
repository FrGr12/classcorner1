
import { Shield, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InstructorClassification } from "@/types/user";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InstructorBadgeProps {
  classification: InstructorClassification;
  size?: "sm" | "md" | "lg";
}

export const InstructorBadge = ({ classification, size = "md" }: InstructorBadgeProps) => {
  if (!classification) return null;

  const sizeClasses = {
    sm: "text-xs py-0 px-1.5",
    md: "text-sm py-0.5 px-2",
    lg: "text-base py-1 px-3"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const badgeContent = () => {
    if (classification === "certified") {
      return (
        <Badge 
          variant="default" 
          className={`bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1 ${sizeClasses[size]}`}
        >
          <Shield className={`fill-white ${iconSizes[size]}`} />
          <span>Certified Instructor</span>
        </Badge>
      );
    } else if (classification === "host") {
      return (
        <Badge 
          variant="default" 
          className={`bg-amber-500 hover:bg-amber-600 flex items-center gap-1 ${sizeClasses[size]}`}
        >
          <Award className={`${iconSizes[size]}`} />
          <span>Skill Host</span>
        </Badge>
      );
    }
    return null;
  };

  const tooltipContent = () => {
    if (classification === "certified") {
      return "Certified Instructors are professionals who have been vetted and approved by our team.";
    } else if (classification === "host") {
      return "Skill Hosts are community members sharing their informal skills and knowledge.";
    }
    return "";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent()}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{tooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InstructorBadge;
