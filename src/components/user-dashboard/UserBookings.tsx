
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingState from "./LoadingState";

const UserBookings = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [dialogType, setDialogType] = useState<string | null>(null);
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
    setSelectedClassId(classId);
    setDialogType(action);
  };

  const handleDialogClose = () => {
    setSelectedClassId(null);
    setDialogType(null);
  };

  const getSelectedClass = () => {
    return classes.find(c => c.id === selectedClassId);
  };

  const getDialogContent = () => {
    const selectedClass = getSelectedClass();
    if (!selectedClass) return null;

    switch (dialogType) {
      case "edit":
        return {
          title: "Edit Booking",
          description: `Edit your booking for ${selectedClass.title}`,
          content: (
            <div className="space-y-4">
              <p>You can modify your booking details here.</p>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  toast({
                    title: "Booking updated",
                    description: "Your booking has been updated successfully."
                  });
                  handleDialogClose();
                }}
              >
                Update Booking
              </Button>
            </div>
          )
        };
      case "message":
        return {
          title: "Message Teacher",
          description: `Send a message to ${selectedClass.instructor}`,
          content: (
            <div className="space-y-4">
              <Input placeholder="Type your message here..." className="h-24" />
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  toast({
                    title: "Message sent",
                    description: "Your message has been sent to the instructor."
                  });
                  handleDialogClose();
                }}
              >
                Send Message
              </Button>
            </div>
          )
        };
      case "promote":
        return {
          title: "Share with Friends",
          description: "Share this class with your friends",
          content: (
            <div className="space-y-4">
              <Input placeholder="Enter email addresses..." />
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  toast({
                    title: "Invitation sent",
                    description: "Invitations have been sent to your friends."
                  });
                  handleDialogClose();
                }}
              >
                Send Invitations
              </Button>
            </div>
          )
        };
      case "share":
        return {
          title: "Share Class",
          description: "Share this class on social media",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">Twitter</Button>
                <Button variant="outline" className="w-full">Facebook</Button>
                <Button variant="outline" className="w-full">LinkedIn</Button>
                <Button variant="outline" className="w-full">Copy Link</Button>
              </div>
            </div>
          )
        };
      default:
        return null;
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

  const dialogContent = getDialogContent();

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
                <TableHead className="w-[300px] text-lg">Title</TableHead>
                <TableHead className="text-lg">Instructor</TableHead>
                <TableHead className="text-lg">Date</TableHead>
                <TableHead className="text-lg">Status</TableHead>
                <TableHead className="text-lg">Price</TableHead>
                <TableHead className="text-right text-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium text-base">
                    <Link 
                      to={`/class/${classItem.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {classItem.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-base">{classItem.instructor}</TableCell>
                  <TableCell className="text-base">
                    {classItem.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-base">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${getStatusBadgeClass(classItem.status)}`}>
                      {classItem.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-base">${classItem.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-purple-100 hover:bg-purple-200 border-purple-200"
                          onClick={() => handleAction("edit", classItem.id)}
                        >
                          <Edit className="h-4 w-4 text-purple-700" />
                        </Button>
                        <span className="text-xs text-neutral-600">Edit</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-purple-100 hover:bg-purple-200 border-purple-200"
                          onClick={() => handleAction("message", classItem.id)}
                        >
                          <MessageSquare className="h-4 w-4 text-purple-700" />
                        </Button>
                        <span className="text-xs text-neutral-600">Message</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-purple-100 hover:bg-purple-200 border-purple-200"
                          onClick={() => handleAction("promote", classItem.id)}
                        >
                          <ArrowUp className="h-4 w-4 text-purple-700" />
                        </Button>
                        <span className="text-xs text-neutral-600">Promote</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-purple-100 hover:bg-purple-200 border-purple-200"
                          onClick={() => handleAction("share", classItem.id)}
                        >
                          <Share2 className="h-4 w-4 text-purple-700" />
                        </Button>
                        <span className="text-xs text-neutral-600">Share</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogType !== null} onOpenChange={() => handleDialogClose()}>
        <DialogContent>
          {dialogContent && (
            <>
              <DialogHeader>
                <DialogTitle>{dialogContent.title}</DialogTitle>
                <DialogDescription>{dialogContent.description}</DialogDescription>
              </DialogHeader>
              {dialogContent.content}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserBookings;
