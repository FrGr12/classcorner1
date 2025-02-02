import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Plus, Calendar, Download, Filter, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ClassStatsCards from "./classes/ClassStatsCards";
import ClassFilters from "./classes/ClassFilters";
import ClassCard from "./classes/ClassCard";

// Mock data for development
const mockClasses = [
  {
    id: 1,
    title: "Introduction to Pottery",
    date: "2024-03-15",
    time: "14:00",
    location: "Art Studio 1",
    maxParticipants: 12,
    currentParticipants: 8,
    waitlistCount: 3,
    status: 'upcoming',
    price: 75,
    duration: "2 hours"
  },
  {
    id: 2,
    title: "Advanced Ceramics Workshop",
    date: "2024-03-18",
    time: "10:00",
    location: "Art Studio 2",
    maxParticipants: 8,
    currentParticipants: 8,
    waitlistCount: 5,
    status: 'upcoming',
    price: 120,
    duration: "3 hours"
  },
];

const mockStats = {
  totalClasses: 15,
  totalBookings: 45,
  waitlistCount: 12,
  occupancyRate: 85
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

  const filteredClasses = mockClasses.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || classItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Classes & Bookings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your classes, bookings, and waitlists
          </p>
        </div>
        <Button onClick={() => navigate("/teach/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <ClassStatsCards stats={mockStats} />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ClassFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "calendar" : "grid")}
          >
            {viewMode === "grid" ? (
              <Calendar className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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