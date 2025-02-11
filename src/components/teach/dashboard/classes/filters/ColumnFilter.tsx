
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface ColumnFilterProps {
  column: string;
  value: string;
  onFilter: (column: string, value: string) => void;
}

const ColumnFilter = ({ column, value, onFilter }: ColumnFilterProps) => (
  <div className="flex items-center gap-2">
    <span>{column}</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <div className="p-2">
          <Input
            placeholder={`Filter ${column.toLowerCase()}...`}
            value={value}
            onChange={(e) => onFilter(column.toLowerCase(), e.target.value)}
            className="h-8"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default ColumnFilter;
