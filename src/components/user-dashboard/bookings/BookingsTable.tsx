
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Share2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ClassItem {
  id: number;
  title: string;
  instructor: string;
  date: Date;
  price: number;
  status: string;
}

interface BookingsTableProps {
  filteredClasses: ClassItem[];
  onAction: (action: string, classId: number) => void;
  getStatusBadgeClass: (status: string) => string;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  filteredClasses,
  onAction,
  getStatusBadgeClass,
}) => {
  return (
    <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px] sm:w-[300px] text-sm sm:text-base">Title</TableHead>
            <TableHead className="text-sm sm:text-base min-w-[100px]">Instructor</TableHead>
            <TableHead className="text-sm sm:text-base min-w-[100px]">Date</TableHead>
            <TableHead className="text-sm sm:text-base min-w-[90px]">Status</TableHead>
            <TableHead className="text-sm sm:text-base min-w-[80px]">Price</TableHead>
            <TableHead className="text-right text-sm sm:text-base min-w-[140px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map(classItem => (
            <TableRow key={classItem.id}>
              <TableCell className="font-medium text-xs sm:text-sm">
                <Link to={`/class/${classItem.id}`} className="hover:text-primary transition-colors line-clamp-2">
                  {classItem.title}
                </Link>
              </TableCell>
              <TableCell className="text-xs sm:text-sm">{classItem.instructor}</TableCell>
              <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                {classItem.date.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusBadgeClass(classItem.status)}`}>
                  {classItem.status}
                </span>
              </TableCell>
              <TableCell className="text-xs sm:text-sm">${classItem.price}</TableCell>
              <TableCell className="text-right p-2 sm:p-4">
                <div className="flex justify-end gap-2 sm:gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-red-100 hover:bg-red-200 border-red-200" 
                      onClick={() => onAction("cancel", classItem.id)}
                    >
                      <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-700" />
                    </Button>
                    <span className="text-[10px] sm:text-xs text-neutral-600">Cancel</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-[#6E44FF]/10 hover:bg-[#6E44FF]/20 border-[#6E44FF]/20" 
                      onClick={() => onAction("message", classItem.id)}
                    >
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-[#6E44FF]" />
                    </Button>
                    <span className="text-[10px] sm:text-xs text-neutral-600">Message</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-[#6E44FF]/10 hover:bg-[#6E44FF]/20 border-[#6E44FF]/20" 
                      onClick={() => onAction("share", classItem.id)}
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-[#6E44FF]" />
                    </Button>
                    <span className="text-[10px] sm:text-xs text-neutral-600">Share</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
