
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageList } from "./MessageList";
import { MessageDetail } from "./MessageDetail";
import { ContactDetail } from "./ContactDetail";
import { ComposeDialog } from "./ComposeDialog";
import { Message } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { InboxHeader } from "./components/InboxHeader";
import { InboxFilters } from "./components/InboxFilters";
import { useInboxData } from "./hooks/useInboxData";

const TeacherInbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const { messages, studentBookings } = useInboxData(selectedMessage?.student_id || null);

  const handleSendMessage = async () => {
    if (!recipient || !messageSubject || !messageContent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please sign in to send messages",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
      setIsComposeOpen(false);
      setMessageSubject("");
      setMessageContent("");
      setRecipient("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send message",
      });
    }
  };

  const handleContactClick = (message: Message) => {
    if (message.profile) {
      navigate("/dashboard/contacts", {
        state: {
          selectedProfile: message.profile,
          fromInbox: true
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <InboxHeader onComposeClick={() => setIsComposeOpen(true)} />
      
      <InboxFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        <ResizablePanel defaultSize={25} minSize={20}>
          <MessageList
            messages={messages || []}
            selectedMessage={selectedMessage}
            onMessageSelect={setSelectedMessage}
            onContactClick={handleContactClick}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={45}>
          <MessageDetail selectedMessage={selectedMessage} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30}>
          <ContactDetail
            selectedMessage={selectedMessage}
            studentBookings={studentBookings || []}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ComposeDialog
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        recipient={recipient}
        setRecipient={setRecipient}
        messageSubject={messageSubject}
        setMessageSubject={setMessageSubject}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        onSend={handleSendMessage}
        contacts={[]}
      />
    </div>
  );
};

export default TeacherInbox;
