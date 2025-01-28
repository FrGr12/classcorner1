import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessagesTable from "../crm/MessagesTable";
import { supabase } from "@/integrations/supabase/client";

const TeacherMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Button>Compose Message</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inbox">
            <TabsList>
              <TabsTrigger value="inbox">Inbox</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="automated">Automated</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Search messages..." className="max-w-sm" />
                <Button variant="outline">Search</Button>
              </div>
              <MessagesTable messages={messages} onSendMessage={() => {}} />
            </TabsContent>
            <TabsContent value="sent">
              <p className="text-neutral-600 py-8 text-center">No sent messages yet.</p>
            </TabsContent>
            <TabsContent value="automated">
              <p className="text-neutral-600 py-8 text-center">No automated messages configured.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherMessages;