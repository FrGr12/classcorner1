
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Star, DollarSign } from "lucide-react";

const OverviewCards = () => {
  return (
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
  );
};

export default OverviewCards;
