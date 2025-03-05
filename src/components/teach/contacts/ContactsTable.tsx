
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/types/contact";
import { MessageSquare, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
}

const ContactsTable = ({ contacts, isLoading }: ContactsTableProps) => {
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'waitlist':
        return 'bg-orange-100 text-orange-800';
      case 'past attendee':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading contacts...</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Last Interaction</TableHead>
            <TableHead>Total Bookings</TableHead>
            <TableHead>Avg. Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">
                {contact.first_name} {contact.last_name}
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {contact.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={`${getTagColor(tag)} border-0`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(contact.last_interaction), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>{contact.total_bookings}</TableCell>
              <TableCell>
                {contact.average_rating ? contact.average_rating.toFixed(1) : '-'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" title="Message Contact">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="View Booking History">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Add Note">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactsTable;
