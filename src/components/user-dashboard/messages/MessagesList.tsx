
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Message } from "./types";
import { MessagesSkeleton } from "./MessagesSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessagesListProps {
  messages: Message[] | undefined;
  isLoading: boolean;
  selectedMessage: Message | null;
  setSelectedMessage: (message: Message) => void;
}

export const MessagesList = ({ 
  messages, 
  isLoading, 
  selectedMessage, 
  setSelectedMessage 
}: MessagesListProps) => {
  if (isLoading) {
    return <MessagesSkeleton />;
  }

  if (!messages || messages.length === 0) {
    return <p className="text-center py-4 text-muted-foreground">No messages found</p>;
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => setSelectedMessage(message)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMessage?.id === message.id
                ? "bg-accent-purple/5 border-accent-purple"
                : "hover:bg-muted"
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.profile?.avatar_url || ""} />
                <AvatarFallback>
                  {message.profile?.first_name?.[0] || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm truncate">
                    {message.profile?.first_name} {message.profile?.last_name}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(message.sent_at), "MMM d")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {message.message_content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
