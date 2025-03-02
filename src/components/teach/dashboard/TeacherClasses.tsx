
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassesHeader from "./teacher-classes/ClassesHeader";
import ClassesCard from "./teacher-classes/ClassesCard";
import SelectedClassCard from "./teacher-classes/SelectedClassCard";
import { mockClasses } from "./teacher-classes/MockClassData";
import { ClassItemLocal } from "./teacher-classes/types";

export default function TeacherClasses() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<ClassItemLocal | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleAction = (action: string, classId: number) => {
    // Handle actions like edit, delete, etc.
    console.log(`Action: ${action}, Class ID: ${classId}`);
    
    if (action === "edit") {
      navigate(`/dashboard/classes/edit/${classId}`);
    } else if (action === "view") {
      // Set the selected class for the detailed view
      const classItem = mockClasses.find(c => c.id === classId);
      if (classItem) {
        setSelectedClass(classItem);
      }
    } else if (action === "duplicate") {
      navigate(`/dashboard/classes/duplicate/${classId}`);
    }
  };

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
        <SelectedClassCard selectedClass={selectedClass} />
      )}
    </div>
  );
}
