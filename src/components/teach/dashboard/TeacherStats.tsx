import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, Star, TrendingUp, LineChart, BarChart2, PieChart, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
      <p>Loading...</p>
    </div>
  );
};

const TeacherStats = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <LoadingState />
        <LoadingState />
        <LoadingState />
      </div>
    );
  }

  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-2xl font-bold">Stats & Insights</h1>
              <p className="text-muted-foreground mt-1">
                View your class statistics and insights
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="text-sm"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter Data
              </Button>
              <Button 
                className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview/Highlights Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Overview & Highlights</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Classes Taught</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                  <p className="text-xs mt-1 opacity-80">Last 30 days</p>
                </div>
                <Calendar className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Bookings</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                  <p className="text-xs mt-1 opacity-80">All time</p>
                </div>
                <Users className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Average Rating</p>
                  <h3 className="text-2xl font-bold mt-2">0.0</h3>
                  <p className="text-xs mt-1 opacity-80">From 0 reviews</p>
                </div>
                <Star className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-2">$0</h3>
                  <p className="text-xs mt-1 opacity-80">Last 30 days</p>
                </div>
                <DollarSign className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* KPIs Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Key Performance Indicators</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Booking Conversion</h3>
              </div>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Views to bookings ratio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Cancellation Rate</h3>
              </div>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Of total bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Completion Rate</h3>
              </div>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Students completing classes
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trends Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Booking Trends</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Monthly Bookings</h3>
              <Button variant="outline" size="sm">Last 12 months</Button>
            </div>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Financial Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Financial Overview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Revenue Breakdown</h3>
              <Button variant="outline" size="sm">This Month</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Gross Revenue</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Platform Fees</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Net Earnings</span>
                <span className="font-medium">$0.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Reviews & Feedback</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Recent Reviews</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <p className="text-muted-foreground text-center py-8">
              No reviews to display yet
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Student Demographics */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Student Demographics</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Student Insights</h3>
              <Button variant="outline" size="sm">Last 30 days</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Age chart will be displayed here
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Student Type</h4>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Type distribution chart will be displayed here
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TeacherStats;
