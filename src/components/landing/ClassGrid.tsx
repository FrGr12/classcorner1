import ClassCard from "./ClassCard";
import { mockClasses } from "@/data/mockClasses";
import { ClassItem } from "@/types/class";

interface ClassGridProps {
  category: string;
}

const ClassGrid = ({ category }: ClassGridProps) => {
  const classes = mockClasses[category as keyof typeof mockClasses] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {classes.map((classItem: ClassItem) => (
        <ClassCard
          key={classItem.id}
          title={classItem.title}
          instructor={classItem.instructor}
          price={classItem.price}
          rating={classItem.rating}
          images={classItem.images}
          level={classItem.level}
        />
      ))}
    </div>
  );
};

export default ClassGrid;