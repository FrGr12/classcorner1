
import { Star } from "lucide-react";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";

const Reviews = () => {
  // Sample top reviews from different classes
  const topReviews = [
    {
      name: "Emma Williams",
      date: "October 15, 2023",
      rating: 5,
      comment: "Sarah is an amazing teacher! Her pottery class was so well-structured, and she was incredibly patient with beginners like me.",
      className: "Introduction to Pottery",
      avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
      name: "James Taylor",
      date: "September 22, 2023",
      rating: 4,
      comment: "The wheel throwing workshop was very informative. The instructor clearly knows the craft and explains techniques well.",
      className: "Wheel Throwing Workshop",
      avatarUrl: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    {
      name: "Sophia García",
      date: "November 5, 2023",
      rating: 5,
      comment: "Michael's advanced pottery techniques class pushed my skills to the next level. His innovative approach to form and texture has completely transformed how I think about ceramics.",
      className: "Advanced Pottery Techniques",
      avatarUrl: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  return (
    <section className="py-12 sm:py-16 border-y border-neutral-200 bg-white/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Our Students Say</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-accent-purple text-accent-purple" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9</span>
            <span className="text-base text-neutral-600">(8,700+ reviews)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topReviews.map((review, index) => (
            <div key={index} className="flex flex-col h-full">
              <TestimonialCard 
                name={review.name}
                date={review.date}
                rating={review.rating}
                comment={review.comment}
                avatarUrl={review.avatarUrl}
              />
              <p className="mt-2 text-sm text-center text-neutral-600">
                Class: {review.className}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <a 
            href="/browse" 
            className="px-6 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-colors"
          >
            Read More Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
