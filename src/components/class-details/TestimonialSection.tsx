
import { useState } from "react";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    date: "March 15, 2024",
    rating: 5,
    comment: "Amazing class! The instructor was very knowledgeable and patient. I learned so much and created a beautiful piece."
  },
  {
    name: "Michael Chen",
    date: "March 10, 2024",
    rating: 4,
    comment: "Great introduction to pottery. The small class size meant we got lots of individual attention."
  },
  {
    name: "Emma Wilson",
    date: "March 5, 2024",
    rating: 5,
    comment: "Exceeded my expectations! The studio is well-equipped and the atmosphere is very welcoming."
  },
  {
    name: "David Brown",
    date: "March 1, 2024",
    rating: 5,
    comment: "Perfect for beginners! The instructor made everything easy to understand."
  },
  {
    name: "Lisa Anderson",
    date: "February 28, 2024",
    rating: 4,
    comment: "Really enjoyed the class. Would have liked a bit more time to practice."
  },
  {
    name: "James Taylor",
    date: "February 25, 2024",
    rating: 3,
    comment: "Good introduction but felt a bit rushed at times. Still learned the basics."
  }
];

const TestimonialSection = () => {
  const [showAll, setShowAll] = useState(false);

  const calculateRatingStats = () => {
    const stats = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };
    
    testimonials.forEach(t => {
      stats[t.rating as keyof typeof stats]++;
    });
    
    return stats;
  };

  const stats = calculateRatingStats();
  const totalReviews = testimonials.length;
  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / totalReviews).toFixed(1);
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="py-12 border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl mb-6">Student Reviews</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{averageRating}</span>
                <span className="text-sm text-neutral-500 ml-2">/ 5</span>
              </div>
              
              <div className="flex my-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${
                      parseFloat(averageRating) >= star 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-neutral-300"
                    }`} 
                  />
                ))}
              </div>
              
              <p className="text-sm text-neutral-500">{totalReviews} reviews</p>
              
              <div className="space-y-2 mt-4">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-xs w-3">{rating}</span>
                      <Star className="w-3 h-3 ml-1 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${(stats[rating as keyof typeof stats] / totalReviews) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {stats[rating as keyof typeof stats]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-4">
              {displayedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  date={testimonial.date}
                  rating={testimonial.rating}
                  comment={testimonial.comment}
                />
              ))}
            </div>
            
            {testimonials.length > 3 && (
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="mt-4 w-full"
              >
                {showAll ? "Show Less" : `Show All (${testimonials.length - 3} more)`}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
