import React from "react";
import { ClassItem } from "@/types/class";
import { Table, TableBody } from "@/components/ui/table";
import { useTableDialogs } from "./hooks/useTableDialogs";
import { useTableFilters } from "./hooks/useTableFilters";
import ClassesTableHeader from "./table/TableHeader";
import ClassRowMobile from "./table/ClassRowMobile";
import ClassRowDesktop from "./table/ClassRowDesktop";
import DialogManager from "./table/DialogManager";

interface ClassesTableProps {
  classes: ClassItem[];
  onAction: (action: string, classId: number) => void;
}

const ClassesTable = ({ classes, onAction }: ClassesTableProps) => {
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
    setSelectedClassId(classId);
    setIsEditOpen(true);
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
  };

  const handleShare = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsShareOpen(true);
  };

  return (
    <>
      <Table className="text-xs sm:text-sm">
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

      <DialogManager
        selectedClassId={selectedClassId}
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
};

export default ClassesTable;
