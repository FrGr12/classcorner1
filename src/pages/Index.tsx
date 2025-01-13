import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Reviews from "@/components/landing/Reviews";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import CrossSections from "@/components/landing/CrossSections";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <Hero />
      <Categories />
      <CrossSections />
      <Reviews />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;