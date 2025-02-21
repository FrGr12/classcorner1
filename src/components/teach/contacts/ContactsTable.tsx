
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Contact } from "@/types/contact";
import { MessageSquare, Calendar, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
}

type SortField = 'name' | 'email' | 'last_interaction' | 'total_bookings';
type SortDirection = 'asc' | 'desc';

const ContactsTable = ({ contacts, isLoading }: ContactsTableProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedContacts = contacts
    .filter(contact => {
      const matchesSearch = (
        contact.first_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      const matchesTag = tagFilter === "" || contact.tags.includes(tagFilter);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'name':
          return direction * (`${a.first_name} ${a.last_name}`).localeCompare(`${b.first_name} ${b.last_name}`);
        case 'email':
          return direction * a.email.localeCompare(b.email);
        case 'last_interaction':
          return direction * (new Date(a.last_interaction).getTime() - new Date(b.last_interaction).getTime());
        case 'total_bookings':
          return direction * (a.total_bookings - b.total_bookings);
        default:
          return 0;
      }
    });

  const allTags = Array.from(new Set(contacts.flatMap(contact => contact.tags)));

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
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email {sortField === 'email' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('last_interaction')}
                >
                  Last Interaction {sortField === 'last_interaction' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('total_bookings')}
                >
                  Total Bookings {sortField === 'total_bookings' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                  )}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedContacts.map((contact) => (
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
                          className={`${getTagColor(tag)} border-0 text-sm px-3 py-1`}
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
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <Button 
                          variant="secondary"
                          size="icon"
                          title="Message Contact"
                          onClick={() => {
                            setSelectedContact(contact);
                            setIsMessageOpen(true);
                          }}
                          className="bg-accent-purple hover:bg-accent-purple/90 mb-1"
                        >
                          <MessageSquare className="h-4 w-4 text-white" />
                        </Button>
                        <span className="text-xs text-gray-600">Message</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Button 
                          variant="secondary"
                          size="icon"
                          title="View Booking History"
                          onClick={() => {
                            setSelectedContact(contact);
                            setIsBookingOpen(true);
                          }}
                          className="bg-accent-purple hover:bg-accent-purple/90 mb-1"
                        >
                          <Calendar className="h-4 w-4 text-white" />
                        </Button>
                        <span className="text-xs text-gray-600">Bookings</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Button 
                          variant="secondary"
                          size="icon"
                          title="Add Note"
                          onClick={() => {
                            setSelectedContact(contact);
                            setIsNoteOpen(true);
                          }}
                          className="bg-accent-purple hover:bg-accent-purple/90 mb-1"
                        >
                          <FileText className="h-4 w-4 text-white" />
                        </Button>
                        <span className="text-xs text-gray-600">Notes</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
