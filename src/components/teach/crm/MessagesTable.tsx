
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import type { Message } from "./TeacherInbox";

interface MessagesTableProps {
  messages: Message[];
  onMessageSelect?: (message: Message) => void;
  selectedMessage?: Message | null;
  onSendMessage?: (studentId: string, courseId: number, content: string) => Promise<void>;
}

const MessagesTable = ({ messages, onMessageSelect, selectedMessage, onSendMessage }: MessagesTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !onSendMessage || !messageContent.trim()) return;

    try {
      setIsSending(true);
      await onSendMessage(
        selectedMessage.student_id,
        selectedMessage.course_id || 0,
        messageContent
      );
      setMessageContent("");
      setIsDialogOpen(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow 
              key={message.id}
              className={`cursor-pointer hover:bg-muted/50 ${selectedMessage?.id === message.id ? 'bg-muted' : ''}`}
              onClick={() => onMessageSelect?.(message)}
            >
              <TableCell>
                {message.profile?.first_name} {message.profile?.last_name}
              </TableCell>
              <TableCell>{message.communication_context || 'No subject'}</TableCell>
              <TableCell className="max-w-md truncate">
                {message.message_content}
              </TableCell>
              <TableCell>{formatDate(message.sent_at)}</TableCell>
              <TableCell>
                <Badge 
                  variant={message.is_unread ? "secondary" : "default"}
                >
                  {message.is_unread ? "Unread" : "Read"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMessageSelect?.(message);
                    setIsDialogOpen(true);
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">
                To: {selectedMessage?.profile?.first_name} {selectedMessage?.profile?.last_name}
              </p>
              <p className="text-sm text-muted-foreground">
                Re: {selectedMessage?.communication_context || 'No subject'}
              </p>
            </div>
            <Textarea
              placeholder="Type your reply here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isSending || !messageContent.trim()}
              onClick={handleSendReply}
            >
              {isSending ? "Sending..." : "Send Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesTable;
