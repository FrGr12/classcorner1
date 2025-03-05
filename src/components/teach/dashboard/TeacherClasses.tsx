
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassesHeader from "./teacher-classes/ClassesHeader";
import ClassesCard from "./teacher-classes/ClassesCard";
import { mockClasses } from "./teacher-classes/MockClassData";
import ClassDetailsDialog from "./classes/ClassDetailsDialog";
import { ClassItemLocal } from "./teacher-classes/types";

export default function TeacherClasses() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleAction = (action: string, classId: number) => {
    console.log(`Action: ${action}, Class ID: ${classId}`);
    
    if (action === "edit") {
      navigate(`/dashboard/classes/edit/${classId}`);
    } else if (action === "view") {
      setSelectedClassId(classId);
      setIsDetailsOpen(true);
    } else if (action === "duplicate") {
      navigate(`/dashboard/classes/duplicate/${classId}`);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedClassId(null);
  };

  const selectedClass = selectedClassId 
    ? mockClasses.find(c => c.id === selectedClassId) 
    : null;

  return (
    <div className="space-y-8">
      <ClassesHeader />

      <ClassesCard 
        classes={mockClasses}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onAction={handleAction}
      />

      {selectedClass && (
        <ClassDetailsDialog
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          classItem={selectedClass as any}
        />
      )}
    </div>
  );
}
