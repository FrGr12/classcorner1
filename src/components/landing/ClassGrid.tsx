import { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import { mockClasses } from "@/data/mockClasses";
import { ClassItem } from "@/types/class";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { useInView } from "react-intersection-observer";
interface ClassGridProps {
  category: string | null;
  sortBy?: string;
  priceRange: [number, number];
  minRating: number;
  isLoading: boolean;
}
const ClassGrid = ({
  category,
  sortBy = "recommended",
  priceRange,
  minRating,
  isLoading
}: ClassGridProps) => {
  const [displayCount, setDisplayCount] = useState(12);
  const {
    ref,
    inView
  } = useInView();
  const ITEMS_PER_PAGE = 12;

  // Filter classes based on category and other filters
  let filteredClasses = category ? mockClasses[category] || [] : Object.values(mockClasses).flat();

  // Apply price range filter
  filteredClasses = filteredClasses.filter(classItem => classItem.price >= priceRange[0] && classItem.price <= priceRange[1]);

  // Apply rating filter
  filteredClasses = filteredClasses.filter(classItem => (classItem.rating || 0) >= minRating);

  // Sort classes based on sortBy parameter
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        // Sort by share count and last shared timestamp
        if (a.shareCount === b.shareCount) {
          return new Date(b.lastShared || 0).getTime() - new Date(a.lastShared || 0).getTime();
        }
        return (b.shareCount || 0) - (a.shareCount || 0);
      case "top-rated":
        return (b.rating || 0) - (a.rating || 0);
      case "last-minute":
        // Sort by closest upcoming dates
        const dateA = Array.isArray(a.date) ? a.date[0] : a.date;
        const dateB = Array.isArray(b.date) ? b.date[0] : b.date;
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      case "this-week":
        // Filter and sort classes available this week
        const thisWeekStart = startOfWeek(new Date());
        const thisWeekEnd = endOfWeek(new Date());
        const aThisWeek = Array.isArray(a.date) ? a.date.some(d => isWithinInterval(new Date(d), {
          start: thisWeekStart,
          end: thisWeekEnd
        })) : isWithinInterval(new Date(a.date), {
          start: thisWeekStart,
          end: thisWeekEnd
        });
        const bThisWeek = Array.isArray(b.date) ? b.date.some(d => isWithinInterval(new Date(d), {
          start: thisWeekStart,
          end: thisWeekEnd
        })) : isWithinInterval(new Date(b.date), {
          start: thisWeekStart,
          end: thisWeekEnd
        });
        if (aThisWeek && !bThisWeek) return -1;
        if (!aThisWeek && bThisWeek) return 1;
        return 0;
      default:
        // recommended
        // Sort by rating and then by date
        if (a.rating === b.rating) {
          const dateA = Array.isArray(a.date) ? a.date[0] : a.date;
          const dateB = Array.isArray(b.date) ? b.date[0] : b.date;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        }
        return (b.rating || 0) - (a.rating || 0);
    }
  });
  const displayedClasses = sortedClasses.slice(0, displayCount);
  const hasMoreClasses = sortedClasses.length > displayCount;
  useEffect(() => {
    if (inView && hasMoreClasses && !isLoading) {
      setDisplayCount(prevCount => prevCount + ITEMS_PER_PAGE);
    }
  }, [inView, hasMoreClasses, isLoading]);
  if (isLoading) {
    return <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">Loading classes...</div>
      </div>;
  }
  return <div className="space-y-4 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 py-0 my-0 px-0">
        {displayedClasses.map((classItem: ClassItem, index: number) => <ClassCard key={`${classItem.id}-${classItem.category}-${index}`} id={classItem.id} title={classItem.title} instructor={classItem.instructor} price={classItem.price} rating={classItem.rating} images={classItem.images} level={classItem.level} date={classItem.date} city={classItem.city} category={classItem.category} groupBookingsEnabled={classItem.groupBookingsEnabled} privateBookingsEnabled={classItem.privateBookingsEnabled} basePriceGroup={classItem.basePriceGroup} basePricePrivate={classItem.basePricePrivate} />)}
      </div>

      {hasMoreClasses && <div ref={ref} className="h-10 flex items-center justify-center">
          {isLoading && <div className="text-gray-500">Loading more classes...</div>}
        </div>}
    </div>;
};
export default ClassGrid;