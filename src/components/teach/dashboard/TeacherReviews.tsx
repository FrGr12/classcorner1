import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const TeacherReviews = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reviews & Testimonials</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Based on 48 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample review - replace with real data */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Pottery Basics</span>
                  <Badge variant="outline">5.0</Badge>
                </div>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-sm text-neutral-600">
                "Great class! The instructor was very patient and helpful. Would definitely recommend!"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherReviews;