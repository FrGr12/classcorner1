
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsOverview from "./overview/StatsOverview";
import BookingTrends from "./trends/BookingTrends";
import FinancialStats from "./financial/FinancialStats";
import ReviewsAnalytics from "./reviews/ReviewsAnalytics";
import DemographicsInsights from "./demographics/DemographicsInsights";
import TeacherAchievements from "./achievements/TeacherAchievements";
import TeacherKPIs from "./kpis/TeacherKPIs";

const TeacherStats = () => {
  const [dateRange, setDateRange] = useState("30days");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Stats & Insights</h1>
        <p className="text-muted-foreground">
          Track your performance and gain insights to grow your teaching business
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="trends">Booking Trends</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <StatsOverview dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="kpis">
          <Card className="p-6">
            <TeacherKPIs dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="p-6">
            <BookingTrends dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="p-6">
            <FinancialStats dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="p-6">
            <ReviewsAnalytics />
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <Card className="p-6">
            <DemographicsInsights />
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="p-6">
            <TeacherAchievements />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherStats;
