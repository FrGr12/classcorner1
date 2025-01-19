import Navigation from "@/components/landing/Navigation";
import Reviews from "@/components/landing/Reviews";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <Categories />
      <Reviews />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;