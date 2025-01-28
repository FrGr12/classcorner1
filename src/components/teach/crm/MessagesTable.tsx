import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MessageSquare } from "lucide-react";

type Message = {
  id: number;
  message_type: string;
  message_content: string;
  sent_at: string;
  read_at: string | null;
  status: string;
  student_id: string;
  course_id: number;
  profile?: {
    first_name: string | null;
    last_name: string | null;
  };
  course?: {
    title: string;
  };
};

interface MessagesTableProps {
  messages: Message[];
  onSendMessage: (studentId: string, courseId: number, content: string) => Promise<void>;
}

const MessagesTable = ({ messages, onSendMessage }: MessagesTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{ id: number; title: string } | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!selectedStudent || !selectedCourse || !messageContent.trim()) return;

    setIsSending(true);
    try {
      await onSendMessage(selectedStudent.id, selectedCourse.id, messageContent);
      setIsDialogOpen(false);
      setMessageContent("");
    } finally {
      setIsSending(false);
    }
  };

  const openMessageDialog = (message: Message) => {
    setSelectedStudent({
      id: message.student_id,
      name: message.profile ? `${message.profile.first_name} ${message.profile.last_name}` : "Anonymous User"
    });
    setSelectedCourse({
      id: message.course_id,
      title: message.course?.title || "Unknown Course"
    });
    setIsDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>
                {message.profile ? 
                  `${message.profile.first_name} ${message.profile.last_name}` : 
                  "Anonymous User"
                }
              </TableCell>
              <TableCell>{message.course?.title || "N/A"}</TableCell>
              <TableCell className="max-w-md truncate">
                {message.message_content}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {message.message_type}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(message.sent_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={message.read_at ? "default" : "secondary"}
                >
                  {message.read_at ? "Read" : "Unread"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openMessageDialog(message)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">To: {selectedStudent?.name}</p>
              <p className="text-sm text-muted-foreground">Course: {selectedCourse?.title}</p>
            </div>
            <Textarea
              placeholder="Type your message here..."
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
              onClick={handleSendMessage}
              disabled={isSending || !messageContent.trim()}
            >
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessagesTable;