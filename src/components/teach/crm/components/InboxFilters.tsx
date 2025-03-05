
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface InboxFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const InboxFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: InboxFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
      <div className="flex gap-2 flex-1 w-full">
        <div className="flex-1 relative">
          <Search className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-7 sm:pl-9 text-xs sm:text-sm h-7 sm:h-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[110px] sm:w-[180px] text-xs sm:text-sm h-7 sm:h-10">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs sm:text-sm">All Messages</SelectItem>
            <SelectItem value="unread" className="text-xs sm:text-sm">Unread</SelectItem>
            <SelectItem value="replied" className="text-xs sm:text-sm">Replied</SelectItem>
            <SelectItem value="pending" className="text-xs sm:text-sm">Pending</SelectItem>
            <SelectItem value="archived" className="text-xs sm:text-sm">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
