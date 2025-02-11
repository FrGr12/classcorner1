
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockClasses } from "@/data/mockClasses";
import ClassesTable from "./classes/ClassesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeacherClasses = () => {
  const navigate = useNavigate();
  const allClasses = Object.values(mockClasses).flat();

  const handleAction = (action: string, classId: number) => {
    switch (action) {
      case "edit":
        navigate(`/dashboard/classes/${classId}/edit`);
        break;
      case "message":
        toast.success("Opening message composer...");
        break;
      case "boost":
        toast.success("Boost feature coming soon!");
        break;
      case "cancel":
        toast.success("Class cancelled successfully");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Classes</h1>
          <p className="text-muted-foreground">Manage your classes and schedules</p>
        </div>
        <Button onClick={() => navigate("/dashboard/create-class")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Class
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassesTable 
            classes={allClasses}
            onAction={handleAction}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherClasses;
