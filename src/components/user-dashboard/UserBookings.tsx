import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoadingState from "./LoadingState";
import BookingsTable from "./bookings/BookingsTable";
import FiltersSection from "./bookings/FiltersSection";
import BookingDialogContent from "./bookings/BookingDialogContent";

const UserBookings = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [dialogType, setDialogType] = useState<string | null>(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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

  const resetFilters = () => {
    setTitleFilter("");
    setInstructorFilter("");
    setDateFilter("");
    setStatusFilter("all");
  };

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

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || classItem.status === statusFilter;
    const matchesTitle = titleFilter === "" || classItem.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesInstructor = instructorFilter === "" || classItem.instructor.toLowerCase().includes(instructorFilter.toLowerCase());
    const matchesDate = dateFilter === "" || classItem.date.toLocaleDateString().includes(dateFilter);
    return matchesSearch && matchesStatus && matchesTitle && matchesInstructor && matchesDate;
  });

  const isFiltersActive = titleFilter || instructorFilter || dateFilter || statusFilter !== "all";

  if (loading) {
    return <LoadingState />;
  }

  const selectedClass = getSelectedClass();
  const dialogContent = selectedClass && dialogType ? {
    cancel: {
      title: "Cancel Booking",
      description: `Are you sure you want to cancel your booking for ${selectedClass.title}?`,
    },
    message: {
      title: "Message Teacher",
      description: `Send a message to ${selectedClass.instructor}`,
    },
    share: {
      title: "Share Class",
      description: "Share this class on social media",
    },
    promote: {
      title: "Share with Friends",
      description: "Share this class with your friends",
    }
  }[dialogType] : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-left">Classes & Bookings</h2>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <FiltersSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            titleFilter={titleFilter}
            setTitleFilter={setTitleFilter}
            instructorFilter={instructorFilter}
            setInstructorFilter={setInstructorFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            resetFilters={resetFilters}
            isFiltersActive={isFiltersActive}
          />

          <BookingsTable
            filteredClasses={filteredClasses}
            onAction={handleAction}
            getStatusBadgeClass={getStatusBadgeClass}
          />
        </CardContent>
      </Card>

      <Dialog open={dialogType !== null} onOpenChange={() => handleDialogClose()}>
        <DialogContent>
          {dialogContent && (
            <BookingDialogContent
              type={dialogType}
              title={dialogContent.title}
              description={dialogContent.description}
              selectedClass={selectedClass}
              onClose={handleDialogClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserBookings;
