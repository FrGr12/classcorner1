
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { mockClasses } from "@/data/mockClasses";
import ClassesTable from "./classes/ClassesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttendanceTracking from "./AttendanceTracking";
import TeacherWaitlist from "@/pages/TeacherWaitlist";

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
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-2xl font-bold">Classes</h1>
              <p className="text-muted-foreground mt-1">
                Manage your classes and schedules
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                size="sm"
                className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10"
                onClick={() => navigate("/dashboard/classes")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Classes
              </Button>
              
              <Button 
                variant="default"
                size="sm"
                className="bg-accent-purple hover:bg-accent-purple/90 text-white"
                onClick={() => navigate("/dashboard/create-class")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Class
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
        </TabsList>

        <TabsContent value="classes">
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
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceTracking />
        </TabsContent>

        <TabsContent value="waitlist">
          <TeacherWaitlist />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherClasses;
