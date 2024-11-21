import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <Hero />
      <Categories />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;