
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessagesList } from "@/components/user-dashboard/messages/MessagesList";
import { MessageDetail } from "@/components/user-dashboard/messages/MessageDetail";
import { MessagesSkeleton } from "@/components/user-dashboard/messages/MessagesSkeleton";
import { MessageControls } from "@/components/user-dashboard/messages/MessageControls";
import { useMessages } from "@/components/user-dashboard/messages/useMessages";
import { Message } from "@/components/user-dashboard/messages/types";
import { ComposeMessageDialog } from "@/components/user-dashboard/messages/ComposeMessageDialog";

const Messages = () => {
  const navigate = useNavigate();
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const {
    messages,
    isLoading,
    selectedMessage,
    setSelectedMessage,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    messageContent,
    setMessageContent,
    handleSendMessage
  } = useMessages();

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setSelectedMessage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex justify-center py-8">
        <Card className="w-full max-w-4xl">
          <MessagesSkeleton />
        </Card>
      </div>
    );
  }

  const filteredMessages = messages?.filter(message => {
    if (selectedTab === "unread") return message.is_unread;
    if (selectedTab === "sent") return message.status === "sent";
    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center py-8 px-4">
      <Card className="w-full max-w-4xl shadow-md">
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex items-center justify-between border-b p-4">
            <TabsList>
              <TabsTrigger value="all">All Messages</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>
            
            <MessageControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onComposeClick={() => setComposeOpen(true)}
            />
          </div>

          <div className="flex h-[600px] max-h-[80vh]">
            <div className="w-1/3 border-r overflow-y-auto">
              <TabsContent value="all" className="mt-0">
                <MessagesList 
                  messages={filteredMessages} 
                  isLoading={isLoading} 
                  selectedMessage={selectedMessage} 
                  setSelectedMessage={handleSelectMessage} 
                />
              </TabsContent>
              <TabsContent value="unread" className="mt-0">
                <MessagesList 
                  messages={filteredMessages} 
                  isLoading={isLoading} 
                  selectedMessage={selectedMessage} 
                  setSelectedMessage={handleSelectMessage} 
                />
              </TabsContent>
              <TabsContent value="sent" className="mt-0">
                <MessagesList 
                  messages={filteredMessages} 
                  isLoading={isLoading} 
                  selectedMessage={selectedMessage} 
                  setSelectedMessage={handleSelectMessage} 
                />
              </TabsContent>
            </div>
            
            <div className="w-2/3 overflow-y-auto">
              {selectedMessage ? (
                <MessageDetail 
                  selectedMessage={selectedMessage}
                  isLoading={isLoading}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-center p-6">
                  <div>
                    <p className="text-lg font-medium">Select a message to view</p>
                    <p className="text-muted-foreground">
                      Or start a new conversation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tabs>

        <ComposeMessageDialog
          isOpen={composeOpen}
          onOpenChange={setComposeOpen}
          messageContent={messageContent}
          setMessageContent={setMessageContent}
          onSendMessage={handleSendMessage}
        />
      </Card>
    </div>
  );
};

export default Messages;
