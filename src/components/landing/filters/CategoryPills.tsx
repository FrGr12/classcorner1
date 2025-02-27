
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
  // Return consistent hover colors using our deep purple
  return { bg: "bg-white", hover: "hover:bg-[#6E44FF] hover:text-white" };
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
      <div className="flex gap-2 sm:gap-4 pb-2 overflow-x-auto no-scrollbar">
        {regularCategories.map((category) => {
          const Icon = category.icon;
          const colors = getCategoryColor(category.name);
          const isSelected = selectedCategories.includes(category.name);
          
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={cn(
                "flex flex-col items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-300",
                "ease-in-out transform hover:scale-105 whitespace-nowrap min-w-fit",
                "shadow-sm hover:shadow-md",
                isSelected
                  ? "bg-[#6E44FF] text-white"
                  : `${colors.bg} text-neutral-800 ${colors.hover}`,
                "group"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-in-out transform group-hover:scale-110",
                isSelected ? "text-white" : "group-hover:text-white"
              )} />
              <span className="text-xs sm:text-sm font-sans tracking-wide font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;
