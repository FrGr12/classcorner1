
import { Suspense } from "react";
import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Reviews from "@/components/landing/Reviews";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import TestimonialSection from "@/components/class-details/TestimonialSection";
import { Skeleton } from "@/components/ui/skeleton";
import InstructorHighlights from "@/components/landing/InstructorHighlights";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <div>
        <Hero />
      </div>
      <div className="space-y-4 sm:space-y-8 md:space-y-12">
        <Categories />
        <Suspense fallback={<div className="container mx-auto px-4 py-16"><Skeleton className="h-96 w-full" /></div>}>
          <InstructorHighlights />
        </Suspense>
        <Reviews />
        <TestimonialSection />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
