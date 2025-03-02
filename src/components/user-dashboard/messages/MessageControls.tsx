
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, PenSquare, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MessageControlsProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  onComposeClick: () => void;
  onBackClick?: () => void;
}

export const MessageControls = ({
  searchQuery = "",
  setSearchQuery = () => {},
  statusFilter = "all",
  setStatusFilter = () => {},
  onComposeClick,
  onBackClick,
}: MessageControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      {onBackClick && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBackClick}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      
      <Button 
        onClick={onComposeClick}
        className="bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white"
      >
        <PenSquare className="mr-2 h-4 w-4" />
        Compose
      </Button>
      
      {setSearchQuery && (
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}
      
      {setStatusFilter && (
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
