
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import ClassesGrid from "./ClassesGrid";
import ClassesTable from "../classes/ClassesTable";
import { ClassItemLocal } from "./types";
import { useState } from "react";

interface ClassesTabsProps {
  classes: ClassItemLocal[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  onAction: (action: string, classId: number) => void;
}

const ClassesTabs = ({ classes, selectedTab, setSelectedTab, onAction }: ClassesTabsProps) => {
  const [viewType, setViewType] = useState<"cards" | "list">("cards");
  
  const filteredClasses = classes.filter(classItem => {
    if (selectedTab === "all") return true;
    if (selectedTab === "active") return classItem.status === "active";
    if (selectedTab === "draft") return classItem.status === "draft";
    if (selectedTab === "completed") return classItem.status === "completed";
    return true;
  });

  return (
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
          <ClassesGrid 
            classes={filteredClasses}
            onAction={onAction}
          />
        ) : (
          <ClassesTable 
            classes={filteredClasses as any}
            onAction={onAction}
          />
        )}
      </TabsContent>
      
      <TabsContent value="active" className="space-y-4">
        {viewType === "cards" ? (
          <ClassesGrid 
            classes={filteredClasses}
            onAction={onAction}
          />
        ) : (
          <ClassesTable 
            classes={filteredClasses as any}
            onAction={onAction}
          />
        )}
      </TabsContent>
      
      <TabsContent value="draft" className="space-y-4">
        {viewType === "cards" ? (
          <ClassesGrid 
            classes={filteredClasses}
            onAction={onAction}
          />
        ) : (
          <ClassesTable 
            classes={filteredClasses as any}
            onAction={onAction}
          />
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4">
        {viewType === "cards" ? (
          <ClassesGrid 
            classes={filteredClasses}
            onAction={onAction}
          />
        ) : (
          <ClassesTable 
            classes={filteredClasses as any}
            onAction={onAction}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ClassesTabs;
