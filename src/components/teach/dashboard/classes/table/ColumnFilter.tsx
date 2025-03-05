
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface ColumnFilterProps {
  column: string;
  value: string;
  onChange: (value: string) => void;
}

const ColumnFilter = ({ column, value, onChange }: ColumnFilterProps) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <span className="text-xs sm:text-sm">{column}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <div className="p-2">
            <Input
              placeholder={`Filter ${column.toLowerCase()}...`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 text-xs sm:text-sm"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnFilter;
