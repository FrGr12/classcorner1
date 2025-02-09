
import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Reviews from "@/components/landing/Reviews";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import TrustedBy from "@/components/landing/TrustedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="pt-20 sm:pt-24 md:pt-32">
        <Hero />
      </div>
      <div className="space-y-8 sm:space-y-12 md:space-y-16">
        <TrustedBy />
        <Categories />
        <Reviews />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
