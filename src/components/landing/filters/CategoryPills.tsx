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
  const colors = {
    "Pottery": { bg: "bg-[#F97316]", hover: "hover:bg-[#EA580C]" },
    "Cooking": { bg: "bg-[#8B5CF6]", hover: "hover:bg-[#7C3AED]" },
    "Baking": { bg: "bg-[#D946EF]", hover: "hover:bg-[#C026D3]" },
    "Painting & Art": { bg: "bg-[#0EA5E9]", hover: "hover:bg-[#0284C7]" },
    "Candle Making": { bg: "bg-[#F43F5E]", hover: "hover:bg-[#E11D48]" },
    "Jewellery & Metal": { bg: "bg-[#10B981]", hover: "hover:bg-[#059669]" },
    "Cocktail & Wine": { bg: "bg-[#6366F1]", hover: "hover:bg-[#4F46E5]" },
    "Photography": { bg: "bg-[#EC4899]", hover: "hover:bg-[#DB2777]" },
    "Music & Dance": { bg: "bg-[#F59E0B]", hover: "hover:bg-[#D97706]" },
    "Wood Craft": { bg: "bg-[#84CC16]", hover: "hover:bg-[#65A30D]" },
    "Textile Craft": { bg: "bg-[#14B8A6]", hover: "hover:bg-[#0D9488]" },
    "Paper Craft": { bg: "bg-[#8B5CF6]", hover: "hover:bg-[#7C3AED]" },
    "Flower & Plants": { bg: "bg-[#EC4899]", hover: "hover:bg-[#DB2777]" },
  };
  return colors[name as keyof typeof colors] || { bg: "bg-neutral-600", hover: "hover:bg-neutral-700" };
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
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={cn(
                "flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300",
                "ease-in-out transform hover:scale-105 whitespace-nowrap min-w-fit",
                "shadow-lg hover:shadow-xl",
                selectedCategories.includes(category.name)
                  ? `${colors.bg} text-white`
                  : `bg-white text-neutral-800 ${colors.hover}`,
                "group"
              )}
            >
              <Icon className="w-5 h-5 transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="text-xs font-display tracking-wide">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;