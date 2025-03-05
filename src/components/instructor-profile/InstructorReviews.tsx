
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { Star } from "lucide-react";

interface InstructorReviewsProps {
  reviews: InstructorReview[];
  instructor: InstructorProfile;
}

const InstructorReviews = ({ reviews, instructor }: InstructorReviewsProps) => {
  return (
    <div className="glass-panel rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h2>
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} />
                  <AvatarFallback className="text-sm font-medium text-accent-purple bg-accent-purple/10">
                    {review.reviewerName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{review.reviewerName}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-neutral-300"
                            }`}
                          />
                        ))}
                        <span className="text-neutral-500 text-sm ml-2">{review.date}</span>
                      </div>
                    </div>
                    
                    {review.className && (
                      <div className="text-sm text-neutral-500">
                        Class: <span className="text-accent-purple">{review.className}</span>
                      </div>
                    )}
                  </div>
                  
                  {review.comment && (
                    <p className="mt-3 text-neutral-700">{review.comment}</p>
                  )}
                  
                  {review.instructorResponse && (
                    <div className="mt-3 pl-4 border-l-2 border-accent-purple/30">
                      <p className="text-sm font-medium text-accent-purple">{instructor.displayName}:</p>
                      <p className="text-sm text-neutral-600">{review.instructorResponse}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-neutral-500">No reviews available yet.</p>
        </div>
      )}
    </div>
  );
};

export default InstructorReviews;
