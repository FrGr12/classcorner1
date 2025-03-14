import React, { memo, useState } from "react";
import { ClassItem } from "@/types/class";
import { Table, TableBody } from "@/components/ui/table";
import { useTableDialogs } from "./hooks/useTableDialogs";
import { useTableFilters } from "./hooks/useTableFilters";
import ClassesTableHeader from "./table/TableHeader";
import ClassRowMobile from "./table/ClassRowMobile";
import ClassRowDesktop from "./table/ClassRowDesktop";
import DialogManager from "./table/DialogManager";
import ClassDetailsDialog from "./ClassDetailsDialog";
import { toast } from "sonner";

interface ClassesTableProps {
  classes: ClassItem[];
  onAction: (action: string, classId: number) => void;
}

const ClassesTable = memo(({ classes, onAction }: ClassesTableProps) => {
  const {
    selectedClassId,
    setSelectedClassId,
    isPromoteOpen,
    setIsPromoteOpen,
    isMessageOpen,
    setIsMessageOpen,
    isShareOpen,
    setIsShareOpen,
    isDetailsOpen,
    setIsDetailsOpen,
    isEditOpen,
    setIsEditOpen,
    handleEditSuccess
  } = useTableDialogs(onAction);

  const { filters, handleFilter } = useTableFilters();

  const handleClassSelect = (classId: number) => {
    setSelectedClassId(classId);
    setIsDetailsOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    onAction('edit', classId);
  };

  const handleMessage = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsMessageOpen(true);
  };

  const handlePromote = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsPromoteOpen(true);
    toast.success("Opening promotion options for your class");
  };

  const handleShare = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsShareOpen(true);
  };

  const selectedClass = selectedClassId 
    ? classes.find(c => c.id === selectedClassId) 
    : null;

  return (
    <>
      <div role="region" aria-label="Classes management table">
        <Table className="text-xs sm:text-sm" aria-label="Classes list">
          <ClassesTableHeader 
            filters={filters} 
            onFilterChange={handleFilter} 
          />
          <TableBody>
            {classes.map((classItem) => (
              <React.Fragment key={classItem.id}>
                <ClassRowMobile
                  classItem={classItem}
                  onDetails={handleClassSelect}
                  onEdit={handleEdit}
                  onMessage={handleMessage}
                  onPromote={handlePromote}
                  onShare={handleShare}
                />
                <ClassRowDesktop
                  classItem={classItem}
                  onDetails={handleClassSelect}
                  onEdit={handleEdit}
                  onMessage={handleMessage}
                  onPromote={handlePromote}
                  onShare={handleShare}
                />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        
        {classes.length === 0 && (
          <div 
            className="text-center py-8 text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            No classes found. Try adjusting your filters.
          </div>
        )}
      </div>

      {/* Class Details Dialog */}
      {selectedClassId && (
        <ClassDetailsDialog
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          classId={selectedClassId}
        />
      )}

      {/* Other Dialogs */}
      <DialogManager
        selectedClassId={selectedClassId}
        selectedClass={selectedClass}
        isPromoteOpen={isPromoteOpen}
        isMessageOpen={isMessageOpen}
        isShareOpen={isShareOpen}
        isDetailsOpen={isDetailsOpen}
        isEditOpen={isEditOpen}
        setIsPromoteOpen={setIsPromoteOpen}
        setIsMessageOpen={setIsMessageOpen}
        setIsShareOpen={setIsShareOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setIsEditOpen={setIsEditOpen}
        onEditSuccess={handleEditSuccess}
      />
    </>
  );
});

ClassesTable.displayName = 'ClassesTable';

export default ClassesTable;
