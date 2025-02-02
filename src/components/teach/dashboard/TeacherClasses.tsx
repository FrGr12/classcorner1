import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CalendarDays, 
  Users, 
  ClipboardList, 
  UserPlus,
  Plus,
  Search,
  Calendar,
  Download,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
  // Add more mock classes as needed
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
      {/* Header */}
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

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waitlist</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.waitlistCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.occupancyRate}%</div>
            <Progress value={mockStats.occupancyRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "calendar" : "grid")}
          >
            {viewMode === "grid" ? (
              <Calendar className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
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

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{classItem.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{classItem.location}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleAction("edit", classItem.id)}>
                    Edit Class
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction("duplicate", classItem.id)}>
                    Duplicate Class
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction("cancel", classItem.id)}>
                    Cancel Class
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Date & Time:</span>
                  <span>{new Date(`${classItem.date} ${classItem.time}`).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span>{classItem.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price:</span>
                  <span>${classItem.price}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participants:</span>
                    <span>{classItem.currentParticipants}/{classItem.maxParticipants}</span>
                  </div>
                  <Progress 
                    value={(classItem.currentParticipants / classItem.maxParticipants) * 100} 
                  />
                </div>
                {classItem.waitlistCount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary" className="gap-1">
                      <UserPlus className="h-3 w-3" />
                      Waitlist: {classItem.waitlistCount}
                    </Badge>
                    <Button variant="link" className="text-xs p-0 h-auto">
                      View List
                    </Button>
                  </div>
                )}
                <div className="pt-4 flex gap-2">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => navigate(`/teach/classes/${classItem.id}`)}
                  >
                    Manage Class
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/teach/classes/${classItem.id}/bookings`)}
                  >
                    View Bookings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;