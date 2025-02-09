
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div>
        <h1 className="text-2xl font-bold mb-2">CRM & Communications</h1>
        <p className="text-muted-foreground">
          Manage your student communications and relationships
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication Management</CardTitle>
          <CardDescription>
            View and manage all your communications in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages" className="space-y-4">
            <TabsList>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="templates">Message Templates</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="messages">
              <Communications />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactManagement />
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Message Templates</CardTitle>
                  <CardDescription>
                    Create and manage message templates for quick responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MessageTemplates />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>
                    Manage follow-up tasks and assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>CRM Analytics</CardTitle>
                  <CardDescription>
                    View insights and metrics about your communications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CRMAnalytics />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherCRM;
