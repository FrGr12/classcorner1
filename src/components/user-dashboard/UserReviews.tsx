import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserReviews = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Reviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Class Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No reviews to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserReviews;