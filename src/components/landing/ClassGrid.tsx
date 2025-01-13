import { useState } from "react";
import ClassCard from "./ClassCard";
import { mockClasses } from "@/data/mockClasses";
import { ClassItem } from "@/types/class";
import { Button } from "@/components/ui/button";

interface ClassGridProps {
  category: string | null;
}

const ClassGrid = ({ category }: ClassGridProps) => {
  const [showAll, setShowAll] = useState(false);
  const ITEMS_PER_PAGE = 24;

  // Filter classes based on category
  const filteredClasses = category
    ? mockClasses[category as keyof typeof mockClasses] || []
    : Object.values(mockClasses).flat();
  
  // Sort classes by the earliest date
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    const dateA = Array.isArray(a.date) ? a.date[0] : a.date;
    const dateB = Array.isArray(b.date) ? b.date[0] : b.date;
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

  const displayedClasses = showAll ? sortedClasses : sortedClasses.slice(0, ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedClasses.map((classItem: ClassItem) => (
          <ClassCard
            key={`${classItem.id}-${classItem.category}`}
            title={classItem.title}
            instructor={classItem.instructor}
            price={classItem.price}
            rating={classItem.rating}
            images={classItem.images}
            level={classItem.level}
            date={classItem.date}
            city={classItem.city}
            category={classItem.category}
          />
        ))}
      </div>

      {sortedClasses.length > ITEMS_PER_PAGE && !showAll && (
        <div className="flex flex-col items-center space-y-4 mt-8">
          <p className="text-lg text-gray-700 font-medium">
            Continue exploring amazing classes
          </p>
          <Button 
            onClick={() => setShowAll(true)}
            className="bg-primary hover:bg-primary/90"
          >
            Show more
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClassGrid;