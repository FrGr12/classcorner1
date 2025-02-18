
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BarChart2, PieChart } from "lucide-react";

const KPISection = () => {
  return (
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
  );
};

export default KPISection;
