
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, MessageSquare, ArrowUp, Share2, Search, Download, Filter } from "lucide-react";
import LoadingState from "./LoadingState";

const UserBookings = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const classes = [
    {
      id: 1,
      title: "Wheel Throwing Workshop",
      instructor: "Michael Chen",
      date: new Date("2024-02-20"),
      price: 90,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Advanced Pottery Techniques",
      instructor: "Sarah Wilson",
      date: new Date("2024-02-25"),
      price: 120,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Beginner's Pottery Class",
      instructor: "Emma Davis",
      date: new Date("2024-03-01"),
      price: 75,
      status: "waitlisted"
    },
    {
      id: 4,
      title: "Ceramic Sculpture Workshop",
      instructor: "David Brown",
      date: new Date("2024-03-05"),
      price: 95,
      status: "saved"
    },
    {
      id: 5,
      title: "Glaze Chemistry Workshop",
      instructor: "Lisa Johnson",
      date: new Date("2024-03-10"),
      price: 110,
      status: "upcoming"
    },
    {
      id: 6,
      title: "Hand-Building Techniques",
      instructor: "James Wilson",
      date: new Date("2024-03-15"),
      price: 85,
      status: "waitlisted"
    },
    {
      id: 7,
      title: "Raku Firing Workshop",
      instructor: "Maria Garcia",
      date: new Date("2024-03-20"),
      price: 150,
      status: "saved"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleAction = (action: string, classId: number) => {
    switch (action) {
      case "edit":
        toast({
          title: "Edit booking",
          description: "Opening booking editor..."
        });
        break;
      case "message":
        toast({
          title: "Message teacher",
          description: "Opening message composer..."
        });
        break;
      case "promote":
        toast({
          title: "Share with friends",
          description: "Opening share options..."
        });
        break;
      case "share":
        toast({
          title: "Share class",
          description: "Opening share options..."
        });
        break;
      default:
        break;
    }
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || classItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "waitlisted":
        return "bg-yellow-100 text-yellow-800";
      case "saved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Classes & Bookings</h2>
          <p className="text-muted-foreground">
            Manage your classes and schedules
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
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
                  <SelectItem value="waitlisted">Waitlisted</SelectItem>
                  <SelectItem value="saved">Saved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/class/${classItem.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {classItem.title}
                    </Link>
                  </TableCell>
                  <TableCell>{classItem.instructor}</TableCell>
                  <TableCell>
                    {classItem.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(classItem.status)}`}>
                      {classItem.status}
                    </span>
                  </TableCell>
                  <TableCell>${classItem.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("edit", classItem.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("message", classItem.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("promote", classItem.id)}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("share", classItem.id)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBookings;
