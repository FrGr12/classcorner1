
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherStats = () => {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-2xl font-bold">{greeting}!</h1>
              <p className="text-muted-foreground mt-1">
                View your class statistics and insights
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Students</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                </div>
                <Users className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Upcoming Classes</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                </div>
                <Calendar className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-2">$0</h3>
                </div>
                <DollarSign className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Average Rating</p>
                  <h3 className="text-2xl font-bold mt-2">0.0</h3>
                </div>
                <Star className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Messages Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-center py-8">
              No recent activity to display
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Upcoming Classes Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Class Performance</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-center py-8">
              No class performance data available
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TeacherStats;
