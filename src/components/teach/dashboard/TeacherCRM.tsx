import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import Communications from "../crm/Communications";
import ContactManagement from "../crm/ContactManagement";
import MessageTemplates from "../crm/MessageTemplates";
import CRMAnalytics from "../crm/CRMAnalytics";
import TaskManagement from "../crm/TaskManagement";

const TeacherCRM = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">CRM & Communications</h1>
          <p className="text-muted-foreground">
            Manage your student communications and relationships
          </p>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
            <ResizablePanel defaultSize={30}>
              <div className="p-4">
                <Communications />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
              <div className="p-4">
                <ContactManagement />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>

        <TabsContent value="contacts">
          <ContactManagement />
        </TabsContent>

        <TabsContent value="templates">
          <MessageTemplates />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <CRMAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCRM;