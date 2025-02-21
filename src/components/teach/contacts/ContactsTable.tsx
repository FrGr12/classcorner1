
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Contact } from "@/types/contact";
import { MessageSquare, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
}

const ContactsTable = ({ contacts, isLoading }: ContactsTableProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

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

  const handleSendMessage = () => {
    // TODO: Implement message sending logic
    setIsMessageOpen(false);
  };

  const handleAddNote = () => {
    // TODO: Implement note adding logic
    setNoteContent("");
    setIsNoteOpen(false);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading contacts...</div>;
  }

  return (
    <>
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Message Contact"
                      onClick={() => {
                        setSelectedContact(contact);
                        setIsMessageOpen(true);
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="View Booking History"
                      onClick={() => {
                        setSelectedContact(contact);
                        setIsBookingOpen(true);
                      }}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Add Note"
                      onClick={() => {
                        setSelectedContact(contact);
                        setIsNoteOpen(true);
                      }}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Message Dialog */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a message to {selectedContact?.first_name} {selectedContact?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Type your message here..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsMessageOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>Send Message</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking History Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking History</DialogTitle>
            <DialogDescription>
              View booking history for {selectedContact?.first_name} {selectedContact?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedContact?.total_bookings === 0 ? (
              <p className="text-muted-foreground">No booking history available</p>
            ) : (
              <p className="text-muted-foreground">Total bookings: {selectedContact?.total_bookings}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add a note about {selectedContact?.first_name} {selectedContact?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Type your note here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNoteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>Save Note</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactsTable;
