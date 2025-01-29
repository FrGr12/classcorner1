import { useState } from "react";
import ClassCard from "./ClassCard";
import { mockClasses } from "@/data/mockClasses";
import { ClassItem } from "@/types/class";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ClassGridProps {
  category: string | null;
}

const ClassGrid = ({ category }: ClassGridProps) => {
  const [displayCount, setDisplayCount] = useState(12);
  const ITEMS_PER_PAGE = 12;

  // Filter classes based on category
  const filteredClasses = category 
    ? mockClasses[category] || []
    : Object.values(mockClasses).flat();

  // Sort classes by the earliest date
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    const dateA = Array.isArray(a.date) ? a.date[0] : a.date;
    const dateB = Array.isArray(b.date) ? b.date[0] : b.date;
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

  const displayedClasses = sortedClasses.slice(0, displayCount);
  const hasMoreClasses = sortedClasses.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {displayedClasses.map((classItem: ClassItem, index: number) => (
          <ClassCard
            key={`${classItem.id}-${classItem.category}-${index}`}
            id={classItem.id}
            title={classItem.title}
            instructor={classItem.instructor}
            price={classItem.price}
            rating={classItem.rating}
            images={classItem.images}
            level={classItem.level}
            date={classItem.date}
            city={classItem.city}
            category={classItem.category}
            groupBookingsEnabled={classItem.groupBookingsEnabled}
            privateBookingsEnabled={classItem.privateBookingsEnabled}
            basePriceGroup={classItem.basePriceGroup}
            basePricePrivate={classItem.basePricePrivate}
          />
        ))}
      </div>

      {hasMoreClasses && (
        <div className="flex flex-col items-center space-y-4 mt-8">
          <p className="text-lg text-gray-700 font-medium">
            Continue exploring amazing classes
          </p>
          <Button 
            onClick={handleLoadMore}
            className="bg-accent-purple hover:bg-accent-purple/90 text-white flex items-center gap-2"
          >
            View More Classes
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClassGrid;