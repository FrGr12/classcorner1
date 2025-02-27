
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Message } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageListProps {
  messages: Message[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message | null) => void;
  onContactClick: (message: Message) => void;
}

export const MessageList = ({ 
  messages, 
  selectedMessage, 
  onMessageSelect, 
  onContactClick 
}: MessageListProps) => {
  return (
    <ScrollArea className="h-[600px]">
      {selectedMessage && (
        <div className="p-2 md:hidden border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMessageSelect(null)}
            className="text-xs flex items-center text-muted-foreground"
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back to messages
          </Button>
        </div>
      )}

      <div className="p-2 sm:p-4 space-y-0.5">
        {messages?.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className={`p-2 sm:p-4 border-b border-neutral-100 cursor-pointer transition-colors ${
              selectedMessage?.id === message.id 
                ? "bg-accent-purple/5" 
                : "hover:bg-neutral-50"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <Avatar 
                className="h-6 w-6 sm:h-8 sm:w-8 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onContactClick(message);
                }}
              >
                <AvatarImage src={message.profile?.avatar_url || ""} />
                <AvatarFallback className="text-xs sm:text-sm">
                  {message.profile?.first_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p 
                    className="font-medium text-xs sm:text-sm truncate text-left cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onContactClick(message);
                    }}
                  >
                    {message.profile?.first_name} {message.profile?.last_name}
                  </p>
                  <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0 ml-1 sm:ml-2">
                    {format(new Date(message.sent_at), "MMM d")}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate text-left">
                  {message.communication_context || "No subject"}
                </p>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs truncate text-neutral-600 text-left pl-8 sm:pl-11">
              {message.message_content}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
