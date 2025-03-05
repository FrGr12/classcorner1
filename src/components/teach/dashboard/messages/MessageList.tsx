
import { format } from "date-fns";
import { Message } from "./types";

interface MessageListProps {
  messages: Message[];
  selectedMessage: Message | null;
  onSelectMessage: (message: Message) => void;
}

export const MessageList = ({ messages, selectedMessage, onSelectMessage }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No messages in this category
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`border-b pb-4 cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-colors ${
            selectedMessage?.id === message.id ? "bg-muted" : ""
          }`}
          onClick={() => onSelectMessage(message)}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-semibold">
                {message.profile?.first_name} {message.profile?.last_name}
              </span>
              {message.course?.title && (
                <span className="text-sm text-muted-foreground ml-2">
                  {message.course.title}
                </span>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {format(new Date(message.sent_at), 'PPp')}
            </span>
          </div>
          <p className="text-sm">{message.message_content}</p>
        </div>
      ))}
    </div>
  );
};
