
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Star } from "lucide-react";

interface TeacherStatsProps {
  stats: {
    totalStudents: number;
    upcomingClasses: number;
    averageRating: number;
    engagementRate?: number;
  };
}

const TeacherStats: FC<TeacherStatsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-[#FD98DD] border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold text-[#FD0000]">Total Students</CardTitle>
          <Users className="h-4 w-4 text-[#FD0000]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#FD0000]">{stats.totalStudents}</div>
          <p className="text-xs text-[#FD0000]/90">Enrolled in your classes</p>
        </CardContent>
      </Card>

      <Card className="bg-[#F9E9CD] border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold text-[#005ED1]">Active Classes</CardTitle>
          <Calendar className="h-4 w-4 text-[#005ED1]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#005ED1]">{stats.upcomingClasses}</div>
          <p className="text-xs text-[#005ED1]/90">Currently running</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherStats;

