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
  MoreHorizontal,
  LayoutGrid,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Extended mock data
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
    duration: "2 hours",
    participants: [
      { id: 1, name: "John Doe", status: "confirmed", paymentStatus: "paid" },
      { id: 2, name: "Jane Smith", status: "confirmed", paymentStatus: "paid" },
      { id: 3, name: "Mike Johnson", status: "pending", paymentStatus: "awaiting" },
    ],
    waitlist: [
      { id: 4, name: "Sarah Wilson", position: 1 },
      { id: 5, name: "Tom Brown", position: 2 },
    ],
    bookingRequests: [
      { id: 6, name: "Alice Green", type: "group", size: 3, status: "pending" },
      { id: 7, name: "Bob White", type: "private", status: "pending" },
    ]
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" /> {status}</Badge>;
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

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-xl">{classItem.title}</CardTitle>
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
              <div className="space-y-6">
                {/* Class Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{new Date(`${classItem.date} ${classItem.time}`).toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{classItem.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${classItem.price}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{classItem.currentParticipants}/{classItem.maxParticipants}</p>
                  </div>
                </div>

                {/* Capacity Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Class Capacity</span>
                    <span>{Math.round((classItem.currentParticipants / classItem.maxParticipants) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(classItem.currentParticipants / classItem.maxParticipants) * 100} 
                  />
                </div>

                {/* Participants Table */}
                <div className="space-y-2">
                  <h4 className="font-medium">Participants</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classItem.participants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell>{participant.name}</TableCell>
                          <TableCell>{getStatusBadge(participant.status)}</TableCell>
                          <TableCell>{participant.paymentStatus}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Booking Requests */}
                {classItem.bookingRequests.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Booking Requests</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classItem.bookingRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{request.name}</TableCell>
                            <TableCell>
                              {request.type === 'group' ? `Group (${request.size})` : 'Private'}
                            </TableCell>
                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Waitlist */}
                {classItem.waitlist.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Waitlist</h4>
                      <Badge variant="secondary" className="gap-1">
                        <UserPlus className="h-3 w-3" />
                        {classItem.waitlist.length} people
                      </Badge>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Position</TableHead>
                          <TableHead>Name</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classItem.waitlist.map((person) => (
                          <TableRow key={person.id}>
                            <TableCell>#{person.position}</TableCell>
                            <TableCell>{person.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
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
