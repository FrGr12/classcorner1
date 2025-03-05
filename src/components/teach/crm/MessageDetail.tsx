
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { format } from "date-fns";
import { Message } from "./types";

interface MessageDetailProps {
  selectedMessage: Message | null;
}

export const MessageDetail = ({ selectedMessage }: MessageDetailProps) => {
  if (!selectedMessage) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Select a message to view details
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedMessage.profile?.avatar_url || ""} />
            <AvatarFallback>
              {selectedMessage.profile?.first_name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h2 className="text-base font-semibold">
              {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
            </h2>
            <p className="text-xs text-muted-foreground">
              {selectedMessage.communication_context}
            </p>
          </div>
        </div>
        <div className="prose max-w-none space-y-4">
          <div className="bg-accent-purple/5 p-4 rounded-lg text-sm text-left border border-accent-purple/10">
            {selectedMessage.message_content}
          </div>
          <div className="text-xs text-muted-foreground text-left">
            Sent {format(new Date(selectedMessage.sent_at), "PPp")}
          </div>
        </div>
        <div className="mt-6">
          <Textarea
            placeholder="Type your reply..."
            className="min-h-[100px] text-sm"
          />
          <div className="flex justify-end mt-2">
            <Button className="text-sm">
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
