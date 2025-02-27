
import { format } from "date-fns";
import { Message } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReplyAll, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface MessageDetailProps {
  selectedMessage: Message | null;
}

export const MessageDetail = ({ selectedMessage }: MessageDetailProps) => {
  const [replyContent, setReplyContent] = useState("");

  if (!selectedMessage) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center text-xs sm:text-sm">
        Select a message to view details
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <AvatarImage src={selectedMessage.profile?.avatar_url || ""} />
              <AvatarFallback className="text-xs sm:text-sm">
                {selectedMessage.profile?.first_name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium text-sm sm:text-base">
                {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {selectedMessage.communication_context || "Direct Message"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs sm:text-sm text-muted-foreground">
          {format(new Date(selectedMessage.sent_at), "MMMM d, yyyy 'at' h:mm a")}
        </div>

        <div className="text-xs sm:text-sm border rounded-lg p-3 sm:p-4 bg-neutral-50">
          {selectedMessage.message_content}
        </div>

        <div className="pt-3 sm:pt-4 space-y-2">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="min-h-[100px] sm:min-h-[120px] text-xs sm:text-sm resize-none"
          />

          <div className="flex justify-end">
            <Button
              className="text-xs sm:text-sm bg-accent-purple hover:bg-accent-purple/90 text-white h-8 sm:h-10"
            >
              <ReplyAll className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Reply
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
