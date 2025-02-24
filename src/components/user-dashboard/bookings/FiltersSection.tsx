
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
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex flex-1 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search classes..." 
            className="pl-8" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
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
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className={isFiltersActive ? "bg-[#6E44FF] text-white hover:bg-[#6E44FF]/90" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium leading-none">Filter Classes</h4>
              <div className="space-y-2">
                <Input 
                  placeholder="Filter by title..." 
                  value={titleFilter} 
                  onChange={e => setTitleFilter(e.target.value)} 
                />
                <Input 
                  placeholder="Filter by instructor..." 
                  value={instructorFilter} 
                  onChange={e => setInstructorFilter(e.target.value)} 
                />
                <Input 
                  placeholder="Filter by date..." 
                  value={dateFilter} 
                  onChange={e => setDateFilter(e.target.value)} 
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="waitlisted">Waitlisted</SelectItem>
                    <SelectItem value="saved">Saved</SelectItem>
                  </SelectContent>
                </Select>
                {isFiltersActive && (
                  <Button variant="outline" className="w-full mt-2" onClick={resetFilters}>
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
