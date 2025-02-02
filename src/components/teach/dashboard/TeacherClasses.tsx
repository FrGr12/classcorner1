import { useEffect, useState } from "react";
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
  Filter
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ClassStats {
  totalClasses: number;
  totalBookings: number;
  waitlistCount: number;
  occupancyRate: number;
}

interface ClassWithStats {
  id: number;
  title: string;
  date: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  waitlistCount: number;
  status: 'upcoming' | 'past' | 'cancelled';
}

const TeacherClasses = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<ClassStats>({
    totalClasses: 0,
    totalBookings: 0,
    waitlistCount: 0,
    occupancyRate: 0
  });
  const [classes, setClasses] = useState<ClassWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchClassesData();
  }, []);

  const fetchClassesData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to view your classes");
        navigate("/auth");
        return;
      }

      // Fetch classes with their stats
      const { data: classesData, error: classesError } = await supabase
        .from('courses')
        .select(`
          *,
          bookings (count),
          waitlist_entries (count)
        `)
        .eq('instructor_id', user.id);

      if (classesError) throw classesError;

      // Calculate stats
      const totalClasses = classesData?.length || 0;
      const totalBookings = classesData?.reduce((acc, curr) => acc + (curr.bookings?.[0]?.count || 0), 0) || 0;
      const waitlistCount = classesData?.reduce((acc, curr) => acc + (curr.waitlist_entries?.[0]?.count || 0), 0) || 0;
      
      // Transform data for the UI
      const transformedClasses = classesData?.map(classItem => ({
        id: classItem.id,
        title: classItem.title,
        date: new Date(classItem.created_at).toLocaleDateString(),
        location: classItem.location,
        maxParticipants: classItem.max_participants || 0,
        currentParticipants: classItem.bookings?.[0]?.count || 0,
        waitlistCount: classItem.waitlist_entries?.[0]?.count || 0,
        status: determineClassStatus(classItem.created_at)
      })) || [];

      setClasses(transformedClasses);
      setStats({
        totalClasses,
        totalBookings,
        waitlistCount,
        occupancyRate: calculateOccupancyRate(totalBookings, classesData)
      });
    } catch (error: any) {
      console.error('Error fetching classes:', error);
      toast.error(error.message || "Failed to fetch classes");
    } finally {
      setIsLoading(false);
    }
  };

  const determineClassStatus = (date: string): 'upcoming' | 'past' | 'cancelled' => {
    const classDate = new Date(date);
    const now = new Date();
    return classDate > now ? 'upcoming' : 'past';
  };

  const calculateOccupancyRate = (totalBookings: number, classes: any[]) => {
    const totalCapacity = classes.reduce((acc, curr) => acc + (curr.max_participants || 0), 0);
    return totalCapacity > 0 ? (totalBookings / totalCapacity) * 100 : 0;
  };

  const filteredClasses = classes.filter(classItem => {
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

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waitlist</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.waitlistCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(stats.occupancyRate)}%</div>
            <Progress value={stats.occupancyRate} className="mt-2" />
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
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Classes List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredClasses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No Classes Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {classes.length === 0 
                  ? "You haven't created any classes yet. Start by adding your first class."
                  : "No classes match your current filters."}
              </p>
              {classes.length === 0 && (
                <Button onClick={() => navigate("/teach/new")} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Class
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{classItem.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{classItem.location}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Date:</span>
                    <span>{classItem.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Participants:</span>
                    <span>{classItem.currentParticipants}/{classItem.maxParticipants}</span>
                  </div>
                  <Progress 
                    value={(classItem.currentParticipants / classItem.maxParticipants) * 100} 
                    className="mt-2"
                  />
                  {classItem.waitlistCount > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Waitlist:</span>
                      <span>{classItem.waitlistCount} people</span>
                    </div>
                  )}
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/teach/classes/${classItem.id}`)}
                    >
                      Manage Class
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherClasses;