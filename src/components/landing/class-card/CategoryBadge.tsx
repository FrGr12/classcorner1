import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => (
  <Badge 
    variant="secondary" 
    className="bg-white/90 text-primary border-none font-display text-xs font-light tracking-wide"
  >
    {category}
  </Badge>
);

export default CategoryBadge;