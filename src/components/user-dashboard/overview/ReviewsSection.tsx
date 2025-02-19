
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";

interface Review {
  id: number;
  created_at: string;
  rating: number;
  review_text: string;
  courses: {
    title: string;
  };
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Reviews</CardTitle>
        <Button 
          variant="ghost" 
          className="text-accent-purple"
          onClick={() => navigate("/student-dashboard/reviews")}
        >
          View All Reviews
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <TestimonialCard
                key={review.id}
                name={review.courses.title}
                date={new Date(review.created_at).toLocaleDateString()}
                rating={review.rating}
                comment={review.review_text}
                avatarUrl={null}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No reviews yet. After taking classes, your reviews will appear here.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsSection;
