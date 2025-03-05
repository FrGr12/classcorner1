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
  return <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-sans mb-6 text-left font-bold">Student Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:col-span-1">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-medium mr-2">{averageRating}</h3>
                  <div className="flex">
                    {Array.from({
                    length: 5
                  }).map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? "fill-accent-purple text-accent-purple" : "text-gray-300"}`} />)}
                  </div>
                </div>
                <p className="text-neutral-600 mb-6">{totalReviews} student reviews</p>
                
                <div className="space-y-2">
                  {Object.entries(stats).reverse().map(([rating, count]) => <div key={rating} className="flex items-center">
                      <span className="w-12 text-sm">{rating} stars</span>
                      <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-accent-purple h-full rounded-full" style={{
                      width: `${count / totalReviews * 100}%`
                    }} />
                      </div>
                      <span className="text-sm text-neutral-600 w-8 text-right">{count}</span>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayedTestimonials.map((testimonial, i) => <TestimonialCard key={i} name={testimonial.name} date={testimonial.date} rating={testimonial.rating} comment={testimonial.comment} />)}
            </div>
            
            {testimonials.length > 3 && <div className="mt-6 text-center">
                <Button variant="outline" onClick={() => setShowAll(!showAll)} className="flex items-center">
                  {showAll ? 'Show Less' : 'Show All Reviews'}
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                </Button>
              </div>}
          </div>
        </div>
      </div>
    </section>;
};
export default TestimonialSection;