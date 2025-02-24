
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
    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px] sm:w-[300px]">Class</TableHead>
            <TableHead className="hidden sm:table-cell">Instructor</TableHead>
            <TableHead className="w-[45px] sm:w-auto">Date</TableHead>
            <TableHead className="w-[70px] sm:w-auto">Status</TableHead>
            <TableHead className="hidden sm:table-cell">Price</TableHead>
            <TableHead className="w-[100px] sm:w-[140px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map(classItem => (
            <TableRow key={classItem.id}>
              <TableCell className="font-medium">
                <Link to={`/class/${classItem.id}`} className="hover:text-primary transition-colors line-clamp-1 sm:line-clamp-2 text-xs sm:text-sm">
                  {classItem.title}
                </Link>
                <span className="block sm:hidden text-[10px] text-muted-foreground mt-0.5">
                  {classItem.instructor}
                </span>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm">
                {classItem.instructor}
              </TableCell>
              <TableCell className="text-[9px] sm:text-sm whitespace-nowrap px-1 sm:px-4">
                {classItem.date.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusBadgeClass(classItem.status)}`}>
                  {classItem.status}
                </span>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm">
                ${classItem.price}
              </TableCell>
              <TableCell className="p-1 sm:p-4">
                <div className="flex justify-end gap-1 sm:gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-red-100 hover:bg-red-200 border-red-200" 
                    onClick={() => onAction("cancel", classItem.id)}
                  >
                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-700" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-[#6E44FF]/10 hover:bg-[#6E44FF]/20 border-[#6E44FF]/20" 
                    onClick={() => onAction("message", classItem.id)}
                  >
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-[#6E44FF]" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-[#6E44FF]/10 hover:bg-[#6E44FF]/20 border-[#6E44FF]/20" 
                    onClick={() => onAction("share", classItem.id)}
                  >
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-[#6E44FF]" />
                  </Button>
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
