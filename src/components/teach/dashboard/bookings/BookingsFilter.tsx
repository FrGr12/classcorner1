import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingsFilterProps {
  filter: string;
  searchTerm: string;
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const BookingsFilter = ({
  filter,
  searchTerm,
  onFilterChange,
  onSearchChange,
}: BookingsFilterProps) => {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 w-[200px]"
        />
      </div>
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter bookings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Bookings</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="past">Past</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingsFilter;