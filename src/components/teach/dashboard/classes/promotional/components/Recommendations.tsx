
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecommendationsProps {
  metrics: Array<{
    views: number;
    ctr: number;
    saves: number;
    bookings: number;
  }>;
}

const Recommendations = ({ metrics }: RecommendationsProps) => {
  const recommendations = [];
  
  if (metrics.length > 0) {
    const latestMetrics = metrics[metrics.length - 1];
    if (latestMetrics.saves > latestMetrics.bookings * 3) {
      recommendations.push(
        "High save-to-booking ratio. Consider sending outreach messages to interested students."
      );
    }
    if (latestMetrics.views > 0 && latestMetrics.ctr < 2) {
      recommendations.push(
        "Low click-through rate. A boost could help improve visibility."
      );
    }
  }

  if (recommendations.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
        <CardDescription>
          Actionable insights to improve your class performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
