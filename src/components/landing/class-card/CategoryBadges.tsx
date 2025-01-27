import { Badge } from "@/components/ui/badge";
import CategoryBadge from "./CategoryBadge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CategoryBadgesProps {
  id?: number;
  displayCategory: string;
  groupBookingsEnabled?: boolean;
  privateBookingsEnabled?: boolean;
}

const CategoryBadges = ({ 
  id, 
  displayCategory, 
  groupBookingsEnabled, 
  privateBookingsEnabled 
}: CategoryBadgesProps) => {
  const [crossFunctionalCategories, setCrossFunctionalCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCrossFunctionalCategories = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('course_category_assignments')
        .select('category')
        .eq('course_id', id);

      if (error) {
        console.error('Error fetching cross-functional categories:', error);
        return;
      }

      const categories = data.map(d => 
        d.category.split('_')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      );
      
      setCrossFunctionalCategories(categories);
    };

    fetchCrossFunctionalCategories();
  }, [id]);

  return (
    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
      <CategoryBadge category={displayCategory} />
      {crossFunctionalCategories.map((cat, index) => (
        <Badge 
          key={index}
          variant="secondary" 
          className="bg-white/90 text-primary border-none font-display text-xs font-light tracking-wide"
        >
          {cat}
        </Badge>
      ))}
      {groupBookingsEnabled && (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Group Bookings
        </Badge>
      )}
      {privateBookingsEnabled && (
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          Private Sessions
        </Badge>
      )}
    </div>
  );
};

export default CategoryBadges;