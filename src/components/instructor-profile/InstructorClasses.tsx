
import { useState } from "react";
import { CalendarDays, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClassCard from "@/components/landing/ClassCard";
import { ClassItem } from "@/types/class";

interface InstructorClassesProps {
  classes: ClassItem[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const InstructorClasses = ({ classes, activeFilter, onFilterChange }: InstructorClassesProps) => {
  const [view, setView] = useState<"grid" | "calendar">("grid");
  
  // Get unique categories from classes
  const categories = [...new Set(classes.map(cls => cls.category))].filter(Boolean);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent-purple" />
          Classes ({classes.length})
        </h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeFilter} onValueChange={onFilterChange}>
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          {categories.map((category, index) => (
            <TabsTrigger key={index} value={category?.toLowerCase() || ""}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeFilter} className="mt-0">
          {classes.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              No classes found for this filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {classes.map((classItem) => (
                <ClassCard
                  key={classItem.id}
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
                  maxParticipants={classItem.maxParticipants}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorClasses;
