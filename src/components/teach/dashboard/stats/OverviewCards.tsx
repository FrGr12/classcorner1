
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Star, DollarSign } from "lucide-react";

const OverviewCards = () => {
  return (
    <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4 px-2 sm:px-0">
      <Card className="bg-accent-purple text-white">
        <CardContent className="p-3 sm:pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium">Total Classes</p>
              <h3 className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">0</h3>
              <p className="text-[9px] sm:text-xs mt-1 opacity-80">Last 30 days</p>
            </div>
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 opacity-70" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent-purple text-white">
        <CardContent className="p-3 sm:pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium">Bookings</p>
              <h3 className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">0</h3>
              <p className="text-[9px] sm:text-xs mt-1 opacity-80">All time</p>
            </div>
            <Users className="h-4 w-4 sm:h-5 sm:w-5 opacity-70" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent-purple text-white">
        <CardContent className="p-3 sm:pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium">Rating</p>
              <h3 className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">0.0</h3>
              <p className="text-[9px] sm:text-xs mt-1 opacity-80">From 0 reviews</p>
            </div>
            <Star className="h-4 w-4 sm:h-5 sm:w-5 opacity-70" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent-purple text-white">
        <CardContent className="p-3 sm:pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium">Revenue</p>
              <h3 className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">$0</h3>
              <p className="text-[9px] sm:text-xs mt-1 opacity-80">Last 30 days</p>
            </div>
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 opacity-70" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
