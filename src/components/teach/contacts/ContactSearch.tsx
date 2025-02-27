
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const ContactSearch = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ContactSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 sm:top-3 sm:h-4 sm:w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 text-xs sm:text-sm h-8 sm:h-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px] text-xs sm:text-sm h-8 sm:h-10">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Contacts</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="past">Past Attendee</SelectItem>
          <SelectItem value="waitlist">Waitlist</SelectItem>
          <SelectItem value="vip">VIP</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ContactSearch;
