
import ClassCard from "../classes/ClassCard";
import { ClassItemLocal } from "./types";

interface ClassesGridProps {
  classes: ClassItemLocal[];
  onAction: (action: string, classId: number) => void;
}

const ClassesGrid = ({ classes, onAction }: ClassesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {classes.map((classItem) => (
        <ClassCard 
          key={classItem.id}
          classItem={classItem as any}
          onAction={(action) => onAction(action, classItem.id)}
        />
      ))}
    </div>
  );
};

export default ClassesGrid;
