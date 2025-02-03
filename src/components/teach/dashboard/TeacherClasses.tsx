import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockClasses } from "@/data/mockClasses";
import ClassStatsOverview from "./classes/ClassStatsOverview";
import ClassFilters from "./classes/ClassFilters";
import ClassCard from "./classes/ClassCard";

const mockStats = {
  totalClasses: 15,
  totalBookings: 45,
  waitlistCount: 12,
  occupancyRate: 85,
};

const TeacherClasses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "calendar">("grid");

  const handleAction = (action: string, classId: number) => {
    switch (action) {
      case "edit":
        navigate(`/teach/classes/${classId}/edit`);
        break;
      case "duplicate":
        toast.success("Class duplicated successfully");
        break;
      case "cancel":
        toast.success("Class cancelled successfully");
        break;
      default:
        break;
    }
  };

  // Convert the mockClasses object into a flat array of all classes
  const allClasses = Object.values(mockClasses).flat();

  const filteredClasses = allClasses.filter((classItem) => {
    const matchesSearch =
      classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.city.toLowerCase().includes(searchTerm.toLowerCase());
    // Remove the status filter since it's not part of the ClassItem type
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Classes & Bookings
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your classes, bookings, and waitlists
          </p>
        </div>
        <Button onClick={() => navigate("/teach/classes/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <ClassStatsOverview stats={mockStats} />

      <ClassFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="grid gap-6 md:grid-cols-1">
        {filteredClasses.map((classItem) => (
          <ClassCard
            key={classItem.id}
            classItem={classItem}
            onAction={handleAction}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;