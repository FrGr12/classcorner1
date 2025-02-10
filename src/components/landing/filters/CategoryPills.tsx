
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  count: string;
  icon: LucideIcon;
}

interface CategoryPillsProps {
  categories: Category[];
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
}

const getCategoryColor = (name: string): { bg: string, hover: string } => {
  // We'll return the same hover colors for consistency
  return { bg: "bg-white", hover: "hover:bg-[#FD98DD] hover:text-[#FD0000]" };
};

const CategoryPills = ({
  categories,
  selectedCategories,
  onCategorySelect,
}: CategoryPillsProps) => {
  // Filter out cross-functional categories
  const regularCategories = categories.filter(category => 
    ["Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making", 
     "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance", 
     "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"].includes(category.name)
  );

  return (
    <div className="mb-4">
      <div className="flex gap-3 pb-2 overflow-x-auto no-scrollbar">
        {regularCategories.map((category) => {
          const Icon = category.icon;
          const colors = getCategoryColor(category.name);
          const isSelected = selectedCategories.includes(category.name);
          
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={cn(
                "flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300",
                "ease-in-out transform hover:scale-105 whitespace-nowrap min-w-fit",
                "shadow-lg hover:shadow-xl",
                isSelected
                  ? "bg-[#FD98DD] text-[#FD0000]"
                  : `${colors.bg} text-neutral-800 ${colors.hover}`,
                "group"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-300 ease-in-out transform group-hover:scale-110",
                isSelected ? "text-[#FD0000]" : "group-hover:text-[#FD0000]"
              )} />
              <span className="text-xs font-display tracking-wide">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;

