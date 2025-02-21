
import { Card } from "@/components/ui/card";
import { TeacherCredits } from "@/components/teach/dashboard/profile/TeacherCredits";
import MetricsChart from "./components/MetricsChart";
import PromotionalActions from "./components/PromotionalActions";
import Recommendations from "./components/Recommendations";

const sampleData = [
  {
    date: "2024-01-01",
    views: 100,
    ctr: 5.2,
    saves: 12,
    bookings: 3,
    matches: 8,
  },
  {
    date: "2024-01-02",
    views: 150,
    ctr: 7.1,
    saves: 18,
    bookings: 5,
    matches: 12,
  },
  {
    date: "2024-01-03",
    views: 120,
    ctr: 6.5,
    saves: 15,
    bookings: 4,
    matches: 10,
  },
  {
    date: "2024-01-04",
    views: 180,
    ctr: 8.0,
    saves: 20,
    bookings: 7,
    matches: 15,
  },
  {
    date: "2024-01-05",
    views: 200,
    ctr: 9.2,
    saves: 25,
    bookings: 10,
    matches: 18,
  },
];

const sampleRecommendations = {
  metrics: {
    views: 150,
    engagement: 7.5,
    bookings: 5
  }
};

const PromotionalStats = () => {
  const handleBoost = () => {
    alert("Boost action triggered");
  };

  const handleSponsor = () => {
    alert("Sponsor action triggered");
  };

  const handleOutreach = () => {
    alert("Outreach action triggered");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="p-6">
          <TeacherCredits />
        </Card>
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Promotional Actions</h2>
            <p className="text-sm text-muted-foreground">
              Boost your class visibility and reach more students
            </p>
            <PromotionalActions
              onBoost={handleBoost}
              onSponsor={handleSponsor}
              onOutreach={handleOutreach}
            />
          </div>
        </Card>
      </div>

      <MetricsChart metrics={sampleData} />
      <Recommendations metrics={sampleRecommendations.metrics} />
    </div>
  );
};

export default PromotionalStats;
