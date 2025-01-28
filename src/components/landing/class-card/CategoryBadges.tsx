import CategoryBadge from "./CategoryBadge";

interface CategoryBadgesProps {
  displayCategory: string;
}

const CategoryBadges = ({ displayCategory }: CategoryBadgesProps) => {
  return (
    <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
      <CategoryBadge category={displayCategory} />
    </div>
  );
};

export default CategoryBadges;