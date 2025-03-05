
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FiltersSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  titleFilter: string;
  setTitleFilter: (value: string) => void;
  instructorFilter: string;
  setInstructorFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  resetFilters: () => void;
  isFiltersActive: boolean;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  titleFilter,
  setTitleFilter,
  instructorFilter,
  setInstructorFilter,
  dateFilter,
  setDateFilter,
  resetFilters,
  isFiltersActive,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row flex-1 gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search classes..." 
            className="pl-8 text-sm" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] text-sm">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="waitlisted">Waitlisted</SelectItem>
            <SelectItem value="saved">Saved</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Download className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className={`h-9 w-9 ${isFiltersActive ? "bg-[#6E44FF] text-white hover:bg-[#6E44FF]/90" : ""}`}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] sm:w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium leading-none text-sm">Filter Classes</h4>
              <div className="space-y-2">
                <Input 
                  placeholder="Filter by title..." 
                  value={titleFilter} 
                  onChange={e => setTitleFilter(e.target.value)}
                  className="text-sm"
                />
                <Input 
                  placeholder="Filter by instructor..." 
                  value={instructorFilter} 
                  onChange={e => setInstructorFilter(e.target.value)}
                  className="text-sm"
                />
                <Input 
                  placeholder="Filter by date..." 
                  value={dateFilter} 
                  onChange={e => setDateFilter(e.target.value)}
                  className="text-sm"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="waitlisted">Waitlisted</SelectItem>
                    <SelectItem value="saved">Saved</SelectItem>
                  </SelectContent>
                </Select>
                {Boolean(isFiltersActive) && (
                  <Button variant="outline" className="w-full mt-2 text-sm" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FiltersSection;
