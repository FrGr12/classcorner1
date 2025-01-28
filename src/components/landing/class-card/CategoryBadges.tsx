import CategoryBadge from "./CategoryBadge";

interface CategoryBadgesProps {
  id?: number;
  displayCategory: string;
}

const CategoryBadges = ({
  id,
  displayCategory,
}: CategoryBadgesProps) => {
  return (
    <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
      <CategoryBadge>{displayCategory}</CategoryBadge>
    </div>
  );
};

export default CategoryBadges;