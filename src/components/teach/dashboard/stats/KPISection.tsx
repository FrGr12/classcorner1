
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BarChart2, PieChart } from "lucide-react";

const KPISection = () => {
  return (
    <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-3 px-2 sm:px-0">
      <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            <h3 className="font-semibold text-sm sm:text-base">Booking Conversion</h3>
          </div>
          <div className="text-xl sm:text-2xl font-bold">0%</div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Views to bookings ratio
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            <h3 className="font-semibold text-sm sm:text-base">Cancellation Rate</h3>
          </div>
          <div className="text-xl sm:text-2xl font-bold">0%</div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Of total bookings
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            <h3 className="font-semibold text-sm sm:text-base">Completion Rate</h3>
          </div>
          <div className="text-xl sm:text-2xl font-bold">0%</div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Students completing classes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPISection;
