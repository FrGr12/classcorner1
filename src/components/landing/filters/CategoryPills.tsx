import { cn } from "@/lib/utils";

interface Category {
  name: string;
  count: string;
  icon: string;
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
      <div className="flex gap-4 pb-4 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={cn(
              "flex flex-col items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 whitespace-nowrap min-w-fit",
              selectedCategories.includes(category.name)
                ? "bg-accent-purple text-white shadow-lg"
                : "bg-white text-neutral-600 hover:bg-neutral-50 shadow-sm hover:shadow-md"
            )}
          >
            <span className="text-3xl transition-transform duration-300 ease-in-out transform group-hover:scale-110">
              {category.icon}
            </span>
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPills;