
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Star, TrendingUp } from "lucide-react";

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-[#6E44FF] border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold text-[#FFC2E2]">Total Students</CardTitle>
          <Users className="h-4 w-4 text-[#FFC2E2]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#FFC2E2]">{stats.totalStudents}</div>
          <p className="text-xs text-[#FFC2E2]/90">Enrolled in your classes</p>
        </CardContent>
      </Card>

      <Card className="bg-[#FFC2E2] border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold text-[#6E44FF]">Active Classes</CardTitle>
          <Calendar className="h-4 w-4 text-[#6E44FF]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#6E44FF]">{stats.upcomingClasses}</div>
          <p className="text-xs text-[#6E44FF]/90">Currently running</p>
        </CardContent>
      </Card>

      <Card className="bg-[#B892FF] border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold text-[#FF90B3]">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-[#FF90B3]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#FF90B3]">{stats.averageRating.toFixed(1)}</div>
          <p className="text-xs text-[#FF90B3]/90">From student reviews</p>
        </CardContent>
      </Card>

      <Card className="bg-[#FF90B3] border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold text-[#B892FF]">Engagement Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-[#B892FF]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#B892FF]">{stats.engagementRate || 0}%</div>
          <p className="text-xs text-[#B892FF]/90">Student participation</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherStats;
