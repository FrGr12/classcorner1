
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px] text-base">Title</TableHead>
          <TableHead className="text-base">Instructor</TableHead>
          <TableHead className="text-base">Date</TableHead>
          <TableHead className="text-base">Status</TableHead>
          <TableHead className="text-base">Price</TableHead>
          <TableHead className="text-right text-base">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredClasses.map(classItem => (
          <TableRow key={classItem.id}>
            <TableCell className="font-medium text-sm">
              <Link to={`/class/${classItem.id}`} className="hover:text-primary transition-colors">
                {classItem.title}
              </Link>
            </TableCell>
            <TableCell className="text-sm">{classItem.instructor}</TableCell>
            <TableCell className="text-sm">
              {classItem.date.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-sm">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(classItem.status)}`}>
                {classItem.status}
              </span>
            </TableCell>
            <TableCell className="text-sm">${classItem.price}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-4">
                <div className="flex flex-col items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 bg-red-100 hover:bg-red-200 border-red-200" 
                    onClick={() => onAction("cancel", classItem.id)}
                  >
                    <XCircle className="h-4 w-4 text-red-700" />
                  </Button>
                  <span className="text-xs text-neutral-600">Cancel</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 bg-[#6E44FF]/10 hover:bg-[#6E44FF]/20 border-[#6E44FF]/20" 
                    onClick={() => onAction("message", classItem.id)}
                  >
                    <MessageSquare className="h-4 w-4 text-[#6E44FF]" />
                  </Button>
                  <span className="text-xs text-neutral-600">Message</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 bg-[#6E44FF]/10 hover:bg-[#6E44FF]/20 border-[#6E44FF]/20" 
                    onClick={() => onAction("share", classItem.id)}
                  >
                    <Share2 className="h-4 w-4 text-[#6E44FF]" />
                  </Button>
                  <span className="text-xs text-neutral-600">Share</span>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;
