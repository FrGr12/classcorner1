
import { ClassItem } from "@/types/class";
import ClassCard from "@/components/landing/ClassCard";

interface InstructorClassesProps {
  classes: ClassItem[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const InstructorClasses = ({ classes, activeFilter, onFilterChange }: InstructorClassesProps) => {
  // Get unique categories from classes for filter buttons
  const categories = [...new Set(classes.map(cls => cls.category).filter(Boolean))];
  
  return (
    <div className="glass-panel rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Classes ({classes.length})</h2>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-4 py-1.5 rounded-full text-sm ${
            activeFilter === "all"
              ? "bg-accent-purple text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          All
        </button>
        
        <button
          onClick={() => onFilterChange("active")}
          className={`px-4 py-1.5 rounded-full text-sm ${
            activeFilter === "active"
              ? "bg-accent-purple text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          Active
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category!)}
            className={`px-4 py-1.5 rounded-full text-sm ${
              activeFilter === category
                ? "bg-accent-purple text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Classes grid */}
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <ClassCard 
              key={classItem.id} 
              classItem={classItem} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-neutral-500">No classes found with the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default InstructorClasses;
