import { useState } from "react";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown } from "lucide-react";
const testimonials = [{
  name: "Sarah Johnson",
  date: "March 15, 2024",
  rating: 5,
  comment: "Amazing class! The instructor was very knowledgeable and patient. I learned so much and created a beautiful piece."
}, {
  name: "Michael Chen",
  date: "March 10, 2024",
  rating: 4,
  comment: "Great introduction to pottery. The small class size meant we got lots of individual attention."
}, {
  name: "Emma Wilson",
  date: "March 5, 2024",
  rating: 5,
  comment: "Exceeded my expectations! The studio is well-equipped and the atmosphere is very welcoming."
}, {
  name: "David Brown",
  date: "March 1, 2024",
  rating: 5,
  comment: "Perfect for beginners! The instructor made everything easy to understand."
}, {
  name: "Lisa Anderson",
  date: "February 28, 2024",
  rating: 4,
  comment: "Really enjoyed the class. Would have liked a bit more time to practice."
}, {
  name: "James Taylor",
  date: "February 25, 2024",
  rating: 3,
  comment: "Good introduction but felt a bit rushed at times. Still learned the basics."
}];
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
  return <section id="reviews-section" className="glass-panel rounded-xl p-8">
      <h2 className="font-bold mb-6 text-left text-xl">What Students Say</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl font-bold">{averageRating}</span>
            <div className="text-sm text-neutral-600">
              <div className="flex items-center gap-1">
                {Array.from({
                length: 5
              }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(averageRating)) ? "fill-accent-purple text-accent-purple" : "text-neutral-300"}`} />)}
              </div>
              <p className="mt-1">{totalReviews} reviews</p>
            </div>
          </div>

          <div className="space-y-2">
            {Object.entries(stats).sort(([a], [b]) => Number(b) - Number(a)).map(([rating, count]) => <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span>{rating}</span>
                    <Star className="w-4 h-4 fill-accent-purple text-accent-purple" />
                  </div>
                  <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-purple" style={{
                width: `${count / totalReviews * 100}%`
              }} />
                  </div>
                  <span className="text-sm text-neutral-600 w-12 text-right">
                    {Math.round(count / totalReviews * 100)}%
                  </span>
                </div>)}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6">
            {displayedTestimonials.map((testimonial, index) => <TestimonialCard key={index} {...testimonial} />)}
          </div>

          {!showAll && testimonials.length > 3 && <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={() => setShowAll(true)} className="gap-2">
                See all reviews
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>}
        </div>
      </div>
    </section>;
};
export default TestimonialSection;