
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
    selectedDialog,
    setSelectedDialog,
    handleEditSuccess
  } = useTableDialogs(onAction);

  const { filters, handleFilter } = useTableFilters();

  const handleClassSelect = (classId: number) => {
    setSelectedClassId(classId);
    setSelectedDialog('details');
  };

  const handleEdit = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setSelectedDialog('edit');
  };

  const handleMessage = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setSelectedDialog('message');
  };

  const handlePromote = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setSelectedDialog('promote');
  };

  const handleShare = (e: React.MouseEvent, classId: number) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setSelectedDialog('share');
  };

  const getSelectedClassData = (): ClassItem | null => {
    if (!selectedClassId) return null;
    return classes.find((c) => c.id === selectedClassId) || null;
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
        selectedDialog={selectedDialog}
        setSelectedDialog={setSelectedDialog}
        selectedClassId={selectedClassId}
        classData={getSelectedClassData()}
      />
    </>
  );
};

export default ClassesTable;
