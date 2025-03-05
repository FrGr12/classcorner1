
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => (
  <Badge 
    variant="secondary" 
    className="bg-white text-accent-purple border border-accent-purple/20 text-sm px-3 py-1 font-display tracking-wide"
  >
    {category}
  </Badge>
);

export default CategoryBadge;
