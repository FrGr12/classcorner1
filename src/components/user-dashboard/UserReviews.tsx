import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const UserReviews = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Reviews</h2>
        <Star className="w-5 h-5 text-neutral-400" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">No reviews yet</p>
      </div>
    </Card>
  );
};

export default UserReviews;