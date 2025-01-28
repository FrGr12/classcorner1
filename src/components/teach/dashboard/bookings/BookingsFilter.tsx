import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface BookingsFilterProps {
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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Bookings</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingsFilter;