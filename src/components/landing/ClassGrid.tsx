import ClassCard from "./ClassCard";
import { mockClasses } from "@/data/mockClasses";
import { ClassItem } from "@/types/class";

interface ClassGridProps {
  category: string | null;
}

const ClassGrid = ({ category }: ClassGridProps) => {
  // If no category is selected, combine all classes from all categories
  const classes = category 
    ? mockClasses[category as keyof typeof mockClasses] || []
    : Object.values(mockClasses).flat();
  
  // Sort classes by date
  const sortedClasses = [...classes].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedClasses.map((classItem: ClassItem) => (
        <ClassCard
          key={classItem.id}
          title={classItem.title}
          instructor={classItem.instructor}
          price={classItem.price}
          rating={classItem.rating}
          images={classItem.images}
          level={classItem.level}
          date={classItem.date}
        />
      ))}
    </div>
  );
};

export default ClassGrid;