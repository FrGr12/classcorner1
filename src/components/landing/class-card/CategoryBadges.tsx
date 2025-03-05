
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryBadgesProps {
  displayCategory: string;
  className?: string;
}

const CategoryBadges = ({ displayCategory, className }: CategoryBadgesProps) => {
  const { t } = useLanguage();
  const translatedCategory = t(`categories.${displayCategory.toLowerCase().replace(/\s+&\s+/g, '_').replace(/\s+/g, '_')}`);

  return (
    <div className={cn("absolute top-3 left-3 z-10", className)}>
      <Badge 
        className="font-sans text-xs font-semibold bg-white/90 text-black hover:bg-white/80"
      >
        {translatedCategory}
      </Badge>
    </div>
  );
};

export default CategoryBadges;
