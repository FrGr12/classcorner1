import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: number;
  message_type: string;
  message_content: string;
  sent_at: string;
  read_at: string | null;
  status: string;
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
}

const MessagesTable = ({ messages }: MessagesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Sent</TableHead>
          <TableHead>Status</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MessagesTable;