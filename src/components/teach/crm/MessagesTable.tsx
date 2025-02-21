import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./types";

interface MessagesTableProps {
  messages: Message[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message) => void;
}

export const MessagesTable = ({ messages, selectedMessage, onMessageSelect }: MessagesTableProps) => {
  return (
    <ScrollArea className="h-[600px]">
      <div className="p-4 space-y-0.5">
        {messages?.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className={`p-4 border-b border-neutral-100 cursor-pointer transition-colors ${
              selectedMessage?.id === message.id ? "bg-accent-purple/5" : "hover:bg-neutral-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.profile?.avatar_url || ""} />
                <AvatarFallback>
                  {message.profile?.first_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm truncate text-left">
                    {message.profile?.first_name} {message.profile?.last_name}
                  </p>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {format(new Date(message.sent_at), "MMM d")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate text-left">
                  {message.communication_context || "No subject"}
                </p>
              </div>
            </div>
            <p className="text-xs truncate text-neutral-600 text-left pl-11">
              {message.message_content}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
