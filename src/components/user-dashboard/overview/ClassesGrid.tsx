
import ClassCard from "@/components/landing/ClassCard";
import { ClassPreview } from "@/types/class";

interface ClassesGridProps {
  classes: ClassPreview[];
  emptyMessage: string;
}

const ClassesGrid = ({ classes, emptyMessage }: ClassesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.length > 0 ? (
        classes.map((classItem) => (
          <ClassCard key={classItem.id} {...classItem} />
        ))
      ) : (
        <p className="text-muted-foreground col-span-3 text-center py-8">
          {emptyMessage}
        </p>
      )}
    </div>
  );
};

export default ClassesGrid;
