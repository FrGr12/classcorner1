
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useMessages } from "./messages/useMessages";
import { MessageControls } from "./messages/MessageControls";
import { MessagesList } from "./messages/MessagesList";
import { MessageDetail } from "./messages/MessageDetail";
import { ComposeMessageDialog } from "./messages/ComposeMessageDialog";

const UserMessages = () => {
  const {
    messages,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isComposeOpen,
    setIsComposeOpen,
    messageContent,
    setMessageContent,
    selectedMessage,
    setSelectedMessage,
    handleSendMessage
  } = useMessages();

  return (
    <div className="space-y-6">
      <MessageControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onComposeClick={() => setIsComposeOpen(true)}
      />

      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        <ResizablePanel defaultSize={40}>
          <MessagesList
            messages={messages}
            isLoading={isLoading}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={60}>
          <MessageDetail
            selectedMessage={selectedMessage}
            isLoading={isLoading}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ComposeMessageDialog
        isOpen={isComposeOpen}
        onOpenChange={setIsComposeOpen}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default UserMessages;
