
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";

interface Review {
  id: number;
  courses: {
    title: string;
  };
  created_at: string;
  rating: number;
  review_text: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <p className="text-muted-foreground col-span-3 text-center py-8">
          No reviews yet. After taking classes, your reviews will appear here.
        </p>
      )}
    </div>
  );
};

export default ReviewsSection;
