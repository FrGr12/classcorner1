import { cn } from "@/lib/utils";

interface Category {
  name: string;
  count: string;
  icon: string;
}

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryPills = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryPillsProps) => {
  return (
    <div className="mb-8">
      <div className="flex gap-4 pb-4 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(
              selectedCategory === category.name ? null : category.name
            )}
            className={cn(
              "flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap min-w-fit",
              selectedCategory === category.name
                ? "bg-accent-purple text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-50"
            )}
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPills;