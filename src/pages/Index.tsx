import Navigation from "@/components/landing/Navigation";
import Reviews from "@/components/landing/Reviews";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import TestimonialSection from "@/components/class-details/TestimonialSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <Categories />
      <Reviews />
      <TestimonialSection />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;