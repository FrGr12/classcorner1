
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Contact } from "@/types/contact";
import { MessageSquare, Calendar, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useDebounce } from "@/hooks/use-debounce";
import { useNavigate } from "react-router-dom";

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
  const [tagFilter, setTagFilter] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const navigate = useNavigate();

  const getTagColor = (tag: string) => {
    return 'bg-white text-accent-purple border border-accent-purple/20';
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
      const matchesTag = tagFilter === "" || contact.tags.includes(tagFilter);
      return matchesTag;
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

  const handleMessageClick = (contact: Contact) => {
    navigate("/dashboard/inbox", { 
      state: { 
        selectedContact: contact,
        fromContacts: true
      }
    });
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
    return <div className="p-1 text-center text-xs">Loading contacts...</div>;
  }

  return (
    <>
      <div className="space-y-1 sm:space-y-4">
        <div className="mb-1 sm:mb-4">
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-full border rounded-md px-2 py-0.5 sm:px-3 sm:py-2 text-xs sm:text-sm h-6 sm:h-10"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="relative overflow-x-auto -mx-4 sm:mx-0">
          <Table className="w-[520px] sm:w-full table-fixed border-collapse">
            <TableHeader>
              <TableRow className="border-b-0 sm:border-b">
                <TableHead 
                  className="cursor-pointer text-[8px] sm:text-sm py-0 sm:py-3 px-0 sm:px-4 w-[22%]"
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" /> : <ChevronDown className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-[8px] sm:text-sm py-0 sm:py-3 px-0 sm:px-4 w-[25%] hidden sm:table-cell"
                  onClick={() => handleSort('email')}
                >
                  Email {sortField === 'email' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" /> : <ChevronDown className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" />
                  )}
                </TableHead>
                <TableHead className="text-[8px] sm:text-sm py-0 sm:py-3 px-0 sm:px-4 w-[15%] hidden sm:table-cell">Phone</TableHead>
                <TableHead className="text-[8px] sm:text-sm py-0 sm:py-3 px-0 sm:px-4 w-[18%]">Tags</TableHead>
                <TableHead 
                  className="cursor-pointer text-[8px] sm:text-sm py-0 sm:py-3 px-0 sm:px-4 w-[18%]"
                  onClick={() => handleSort('last_interaction')}
                >
                  Last {sortField === 'last_interaction' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" /> : <ChevronDown className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-[8px] sm:text-sm py-0 sm:py-3 px-0 sm:px-4 w-[8%]"
                  onClick={() => handleSort('total_bookings')}
                >
                  # {sortField === 'total_bookings' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" /> : <ChevronDown className="inline h-1.5 w-1.5 sm:h-3 sm:w-3" />
                  )}
                </TableHead>
                <TableHead className="text-[8px] sm:text-sm py-0 sm:py-3 px-0 sm:px-4 w-[24%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedContacts.map((contact) => (
                <TableRow key={contact.id} className="border-b-0 sm:border-b h-6 sm:h-auto">
                  <TableCell className="font-medium text-[8px] sm:text-sm py-0 sm:py-4 px-0 sm:px-4 truncate">
                    {contact.first_name} {contact.last_name}
                  </TableCell>
                  <TableCell className="text-[8px] sm:text-sm py-0 sm:py-4 px-0 sm:px-4 truncate hidden sm:table-cell">
                    {contact.email}
                  </TableCell>
                  <TableCell className="text-[8px] sm:text-sm py-0 sm:py-4 px-0 sm:px-4 hidden sm:table-cell">{contact.phone || '-'}</TableCell>
                  <TableCell className="text-[8px] sm:text-sm py-0 sm:py-4 px-0 sm:px-4">
                    <div className="flex gap-0.5 sm:gap-2 flex-wrap">
                      {contact.tags.slice(0, 1).map((tag) => (
                        <Badge
                          key={tag}
                          className={`${getTagColor(tag)} text-[6px] sm:text-xs px-0.5 sm:px-3 py-0 sm:py-1 truncate max-w-[45px] sm:max-w-none`}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {contact.tags.length > 1 && (
                        <Badge className="bg-gray-100 text-[6px] sm:text-xs px-0.5 sm:px-2 py-0 sm:py-0.5">
                          +{contact.tags.length - 1}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-[8px] sm:text-sm py-0 sm:py-4 px-0 sm:px-4 whitespace-nowrap">
                    {format(new Date(contact.last_interaction), 'MM/dd/yy')}
                  </TableCell>
                  <TableCell className="text-[8px] sm:text-sm py-0 sm:py-4 px-0 sm:px-4">{contact.total_bookings}</TableCell>
                  <TableCell className="text-[8px] sm:text-sm py-0 sm:py-4 px-0 sm:px-4">
                    <div className="flex gap-0.5 sm:gap-4 justify-end">
                      <Button 
                        variant="secondary"
                        size="icon"
                        title="Message Contact"
                        onClick={() => handleMessageClick(contact)}
                        className="bg-accent-purple hover:bg-accent-purple/90 h-3.5 w-3.5 sm:h-8 sm:w-8 p-0"
                      >
                        <MessageSquare className="h-1.5 w-1.5 sm:h-4 sm:w-4 text-white" />
                      </Button>
                      <Button 
                        variant="secondary"
                        size="icon"
                        title="View Booking History"
                        onClick={() => {
                          setSelectedContact(contact);
                          setIsBookingOpen(true);
                        }}
                        className="bg-accent-purple hover:bg-accent-purple/90 h-3.5 w-3.5 sm:h-8 sm:w-8 p-0"
                      >
                        <Calendar className="h-1.5 w-1.5 sm:h-4 sm:w-4 text-white" />
                      </Button>
                      <Button 
                        variant="secondary"
                        size="icon"
                        title="Add Note"
                        onClick={() => {
                          setSelectedContact(contact);
                          setIsNoteOpen(true);
                        }}
                        className="bg-accent-purple hover:bg-accent-purple/90 h-3.5 w-3.5 sm:h-8 sm:w-8 p-0"
                      >
                        <FileText className="h-1.5 w-1.5 sm:h-4 sm:w-4 text-white" />
                      </Button>
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
        <DialogContent className="max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base">Send Message</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Send a message to {selectedContact?.first_name} {selectedContact?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Type your message here..."
              className="min-h-[100px] text-xs sm:text-sm"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsMessageOpen(false)} className="text-xs sm:text-sm h-8 sm:h-10">
                Cancel
              </Button>
              <Button onClick={handleSendMessage} className="text-xs sm:text-sm h-8 sm:h-10">Send Message</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking History Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base">Booking History</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              View booking history for {selectedContact?.first_name} {selectedContact?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedContact?.total_bookings === 0 ? (
              <p className="text-muted-foreground text-xs sm:text-sm">No booking history available</p>
            ) : (
              <p className="text-muted-foreground text-xs sm:text-sm">Total bookings: {selectedContact?.total_bookings}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base">Add Note</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Add a note about {selectedContact?.first_name} {selectedContact?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Type your note here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[100px] text-xs sm:text-sm"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNoteOpen(false)} className="text-xs sm:text-sm h-8 sm:h-10">
                Cancel
              </Button>
              <Button onClick={handleAddNote} className="text-xs sm:text-sm h-8 sm:h-10">Save Note</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactsTable;
