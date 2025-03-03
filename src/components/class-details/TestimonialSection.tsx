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
  return;
};
export default TestimonialSection;