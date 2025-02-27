
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar, Users, Clock, ArrowUpRight } from "lucide-react";
import ClassCard from "./classes/ClassCard";
import ClassesTable from "./classes/ClassesTable";
import ClassesHeader from "./classes/ClassesHeader";
import { useNavigate } from "react-router-dom";
import ClassesTabs from "./classes/ClassesTabs";

interface ClassItem {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  capacity: {
    total: number;
    booked: number;
  };
  image?: string;
  status: "active" | "draft" | "completed" | "cancelled";
  waitlist?: number;
}

export default function TeacherClasses() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<"cards" | "list">("cards");
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");

  // Mock data for classes
  const classes: ClassItem[] = [
    {
      id: 1,
      title: "Introduction to Pottery",
      category: "Pottery",
      date: "2023-07-15",
      time: "10:00 AM",
      duration: "2 hours",
      location: "Studio A",
      price: 75,
      capacity: {
        total: 10,
        booked: 8
      },
      status: "active",
      waitlist: 3
    },
    {
      id: 2,
      title: "Watercolor Basics",
      category: "Painting",
      date: "2023-07-18",
      time: "2:00 PM",
      duration: "3 hours",
      location: "Studio B",
      price: 60,
      capacity: {
        total: 12,
        booked: 6
      },
      status: "active"
    },
    {
      id: 3,
      title: "Advanced Pottery Techniques",
      category: "Pottery",
      date: "2023-07-25",
      time: "1:00 PM",
      duration: "4 hours",
      location: "Studio A",
      price: 120,
      capacity: {
        total: 8,
        booked: 3
      },
      status: "draft"
    }
  ];

  const filteredClasses = classes.filter(classItem => {
    if (selectedTab === "all") return true;
    if (selectedTab === "active") return classItem.status === "active";
    if (selectedTab === "draft") return classItem.status === "draft";
    if (selectedTab === "completed") return classItem.status === "completed";
    return true;
  });

  const handleAction = (action: string, classId: number) => {
    // Handle actions like edit, delete, etc.
    console.log(`Action: ${action}, Class ID: ${classId}`);
    
    if (action === "edit") {
      navigate(`/dashboard/classes/edit/${classId}`);
    } else if (action === "view") {
      // Set the selected class for the detailed view
      const classItem = classes.find(c => c.id === classId);
      if (classItem) {
        setSelectedClass(classItem);
      }
    } else if (action === "duplicate") {
      navigate(`/dashboard/classes/duplicate/${classId}`);
    }
  };

  return (
    <div className="space-y-8">
      <ClassesHeader onActionClick={(actionType) => {
        if (actionType === "create") {
          navigate("/dashboard/classes/create");
        }
      }} />

      <Card>
        <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle>Your Classes</CardTitle>
            <CardDescription>
              Manage and organize your scheduled classes
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/dashboard/classes/create")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Class
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Classes</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex space-x-2">
                <Button
                  variant={viewType === "cards" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setViewType("cards")}
                  className="h-8 w-8 p-0"
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewType === "list" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setViewType("list")}
                  className="h-8 w-8 p-0"
                >
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {viewType === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClasses.map((classItem) => (
                    <ClassCard 
                      key={classItem.id}
                      classItem={classItem}
                      onAction={(action) => handleAction(action, classItem.id)}
                    />
                  ))}
                </div>
              ) : (
                <ClassesTable 
                  classes={filteredClasses}
                  onAction={(action, classId) => handleAction(action, classId)}
                />
              )}
            </TabsContent>
            
            {/* Similar structure for other tab content... */}
            <TabsContent value="active" className="space-y-4">
              {viewType === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClasses.map((classItem) => (
                    <ClassCard 
                      key={classItem.id}
                      classItem={classItem}
                      onAction={(action) => handleAction(action, classItem.id)}
                    />
                  ))}
                </div>
              ) : (
                <ClassesTable 
                  classes={filteredClasses}
                  onAction={(action, classId) => handleAction(action, classId)}
                />
              )}
            </TabsContent>
            
            <TabsContent value="draft" className="space-y-4">
              {viewType === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClasses.map((classItem) => (
                    <ClassCard 
                      key={classItem.id}
                      classItem={classItem}
                      onAction={(action) => handleAction(action, classItem.id)}
                    />
                  ))}
                </div>
              ) : (
                <ClassesTable 
                  classes={filteredClasses}
                  onAction={(action, classId) => handleAction(action, classId)}
                />
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {viewType === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClasses.map((classItem) => (
                    <ClassCard 
                      key={classItem.id}
                      classItem={classItem}
                      onAction={(action) => handleAction(action, classItem.id)}
                    />
                  ))}
                </div>
              ) : (
                <ClassesTable 
                  classes={filteredClasses}
                  onAction={(action, classId) => handleAction(action, classId)}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{selectedClass.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {selectedClass.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedClass.duration}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(`/class/${selectedClass.id}`)}>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View Public Page
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <ClassesTabs />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
