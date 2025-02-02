import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface ClassCardHeaderProps {
  title: string;
  city: string;
  onAction: (action: string, classId: number) => void;
  classId: number;
}

const ClassCardHeader = ({ title, city, onAction, classId }: ClassCardHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-start justify-between pb-2">
      <div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{city}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAction("edit", classId)}>
            Edit Class
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("duplicate", classId)}>
            Duplicate Class
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("cancel", classId)}>
            Cancel Class
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
};

export default ClassCardHeader;