
import { Card } from "@/components/ui/card";
import { Star, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserReviews = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Your Reviews</h2>
          <p className="text-sm text-muted-foreground">Share your experience with the community</p>
        </div>
        <Star className="w-5 h-5 text-[#6E44FF]" />
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#6E44FF]/10 flex items-center justify-center mb-4">
          <PenLine className="w-6 h-6 text-[#6E44FF]" />
        </div>
        <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          After attending classes, you can share your experience and help others discover great instructors
        </p>
        <Button 
          onClick={() => navigate('/student-dashboard/bookings')}
          className="bg-[#6E44FF] hover:bg-[#6E44FF]/90"
        >
          View Your Classes
        </Button>
      </div>
    </Card>
  );
};

export default UserReviews;
