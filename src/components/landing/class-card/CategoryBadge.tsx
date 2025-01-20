import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => (
  <Badge 
    variant="secondary" 
    className="bg-white/90 text-primary border-none"
  >
    {category}
  </Badge>
);

export default CategoryBadge;