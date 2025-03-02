
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Message } from "./types";

interface MessageReplyProps {
  selectedMessage: Message;
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendReply: () => void;
  onClose: () => void;
}

export const MessageReply = ({ 
  selectedMessage, 
  newMessage,
  setNewMessage,
  onSendReply,
  onClose
}: MessageReplyProps) => {
  return (
    <div className="mt-6 space-y-4 border-t pt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Reply to {selectedMessage.profile?.first_name}</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <div className="space-y-4">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your reply..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button
            onClick={onSendReply}
            disabled={!newMessage.trim()}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Send Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
