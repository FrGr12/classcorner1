
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, UserCheck, UserX } from "lucide-react";

export function AttendanceTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  // Mock data for demonstration
  const attendanceData = [
    {
      id: 1,
      student: "Emma Johnson",
      email: "emma.j@example.com",
      class: "Introduction to Pottery",
      date: "2023-08-15",
      status: "attended",
      notes: "Completed all exercises"
    },
    {
      id: 2,
      student: "Michael Smith",
      email: "m.smith@example.com",
      class: "Advanced Ceramics",
      date: "2023-08-16",
      status: "absent",
      notes: "Notified in advance"
    },
    {
      id: 3,
      student: "Sarah Williams",
      email: "sarah.w@example.com",
      class: "Introduction to Pottery",
      date: "2023-08-15",
      status: "attended",
      notes: ""
    },
    {
      id: 4,
      student: "James Brown",
      email: "j.brown@example.com",
      class: "Introduction to Pottery",
      date: "2023-08-15",
      status: "late",
      notes: "Arrived 15 minutes late"
    },
    {
      id: 5,
      student: "Emily Davis",
      email: "emily.d@example.com",
      class: "Advanced Ceramics",
      date: "2023-08-16",
      status: "attended",
      notes: ""
    }
  ];

  const filteredData = attendanceData.filter(
    item =>
      (selectedClass === "all" || item.class === selectedClass) &&
      (item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-1/2 md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedClass}>
        <TabsList>
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="Introduction to Pottery">Pottery</TabsTrigger>
          <TabsTrigger value="Advanced Ceramics">Ceramics</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedClass} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.student}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "attended"
                              ? "outline"
                              : record.status === "absent"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.notes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <UserX className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Provide both named export and default export for backward compatibility
export default AttendanceTracking;
