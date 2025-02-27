
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgesProps {
  displayCategory: string;
  className?: string;
}

const CategoryBadges = ({ displayCategory, className }: CategoryBadgesProps) => {
  return (
    <div className={cn("absolute top-3 left-3 z-10", className)}>
      <Badge 
        className="font-sans text-xs font-medium bg-white/90 text-black hover:bg-white/80"
      >
        {displayCategory}
      </Badge>
    </div>
  );
};

export default CategoryBadges;
