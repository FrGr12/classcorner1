
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { MessageList } from "./MessageList";
import { MessageReply } from "./MessageReply";
import { useTeacherMessages } from "./useTeacherMessages";
import { MessageTab } from "./types";

const TeacherMessages = () => {
  const {
    loading,
    messages,
    newMessage,
    setNewMessage,
    selectedMessage,
    setSelectedMessage,
    activeTab,
    setActiveTab,
    handleSendReply,
    getUnreadMessages,
    getSentMessages
  } = useTeacherMessages();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Manage your communications with students
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as MessageTab)}>
            <TabsList>
              <TabsTrigger value="all">All Messages</TabsTrigger>
              <TabsTrigger value="unread">Unread ({getUnreadMessages().length})</TabsTrigger>
              <TabsTrigger value="sent">Sent ({getSentMessages().length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <MessageList 
                messages={messages} 
                selectedMessage={selectedMessage}
                onSelectMessage={setSelectedMessage}
              />
            </TabsContent>
            
            <TabsContent value="unread">
              <MessageList 
                messages={getUnreadMessages()} 
                selectedMessage={selectedMessage}
                onSelectMessage={setSelectedMessage}
              />
            </TabsContent>
            
            <TabsContent value="sent">
              <MessageList 
                messages={getSentMessages()} 
                selectedMessage={selectedMessage}
                onSelectMessage={setSelectedMessage}
              />
            </TabsContent>
          </Tabs>

          {selectedMessage && (
            <MessageReply
              selectedMessage={selectedMessage}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSendReply={handleSendReply}
              onClose={() => setSelectedMessage(null)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherMessages;
