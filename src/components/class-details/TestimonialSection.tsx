
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";

const testimonials = [
  {
    name: "Sarah Johnson",
    date: "March 15, 2024",
    rating: 5,
    comment: "Amazing class! The instructor was very knowledgeable and patient. I learned so much and created a beautiful piece.",
  },
  {
    name: "Michael Chen",
    date: "March 10, 2024",
    rating: 4,
    comment: "Great introduction to pottery. The small class size meant we got lots of individual attention.",
  },
  {
    name: "Emma Wilson",
    date: "March 5, 2024",
    rating: 5,
    comment: "Exceeded my expectations! The studio is well-equipped and the atmosphere is very welcoming.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-left">What Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
