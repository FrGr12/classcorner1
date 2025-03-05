
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import LoadingState from "@/components/user-dashboard/LoadingState";
import StatsHeader from "./stats/StatsHeader";
import OverviewCards from "./stats/OverviewCards";
import KPISection from "./stats/KPISection";

const TeacherStats = () => {
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

  return (
    <div className="space-y-8 text-left">
      <StatsHeader />

      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Overview & Highlights</h2>
        <OverviewCards />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Key Performance Indicators</h2>
        <KPISection />
      </section>

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
