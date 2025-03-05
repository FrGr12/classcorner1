
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
    <div className="space-y-4 sm:space-y-8 text-left -mx-4 sm:mx-0 px-2 sm:px-0">
      <StatsHeader />

      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-left px-2 sm:px-0">Overview & Highlights</h2>
        <OverviewCards />
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-left px-2 sm:px-0">Key Performance Indicators</h2>
        <KPISection />
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-left px-2 sm:px-0">Booking Trends</h2>
        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-semibold text-sm sm:text-base">Monthly Bookings</h3>
              <Button variant="outline" size="sm" className="text-xs h-7 px-2 sm:text-sm sm:h-9 sm:px-3">Last 12 months</Button>
            </div>
            <div className="h-[200px] sm:h-[300px] flex items-center justify-center text-muted-foreground text-sm">
              Chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-left px-2 sm:px-0">Financial Overview</h2>
        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h3 className="font-semibold text-sm sm:text-base">Revenue Breakdown</h3>
              <Button variant="outline" size="sm" className="text-xs h-7 px-2 sm:text-sm sm:h-9 sm:px-3">This Month</Button>
            </div>
            <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
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
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-left px-2 sm:px-0">Reviews & Feedback</h2>
        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h3 className="font-semibold text-sm sm:text-base">Recent Reviews</h3>
              <Button variant="outline" size="sm" className="text-xs h-7 px-2 sm:text-sm sm:h-9 sm:px-3">View All</Button>
            </div>
            <p className="text-muted-foreground text-center py-6 sm:py-8 text-sm sm:text-base">
              No reviews to display yet
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-left px-2 sm:px-0">Student Demographics</h2>
        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h3 className="font-semibold text-sm sm:text-base">Student Insights</h3>
              <Button variant="outline" size="sm" className="text-xs h-7 px-2 sm:text-sm sm:h-9 sm:px-3">Last 30 days</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-xs sm:text-sm font-medium mb-2">Age Distribution</h4>
                <div className="h-[150px] sm:h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                  Age chart will be displayed here
                </div>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-medium mb-2">Student Type</h4>
                <div className="h-[150px] sm:h-[200px] flex items-center justify-center text-muted-foreground text-sm">
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
