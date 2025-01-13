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

const CategoryPills = ({
  categories,
  selectedCategories,
  onCategorySelect,
}: CategoryPillsProps) => {
  return (
    <div className="mb-8">
      <div className="flex gap-3 pb-4 overflow-x-auto no-scrollbar">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={cn(
                "flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 whitespace-nowrap min-w-fit",
                selectedCategories.includes(category.name)
                  ? "bg-accent-purple text-white shadow-lg"
                  : "bg-white text-neutral-600 hover:bg-neutral-50 shadow-sm hover:shadow-md"
              )}
            >
              <Icon className="w-6 h-6 transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;