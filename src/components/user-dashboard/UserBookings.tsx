import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserBookings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Bookings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No upcoming bookings to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBookings;