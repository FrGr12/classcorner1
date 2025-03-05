
import { Suspense } from "react";
import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Reviews from "@/components/landing/Reviews";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import TestimonialSection from "@/components/class-details/TestimonialSection";
import { Skeleton } from "@/components/ui/skeleton";
import InstructorBadge from "@/components/instructor-profile/InstructorBadge";

// New component for the instructor highlights section
const InstructorHighlights = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-normal text-center mb-8">Learn from Expert Instructors</h2>
        <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-12">
          Discover unique classes taught by talented instructors with real-world experience and passion for teaching.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Instructor Cards - With classification badges */}
          <a 
            href="/instructor/1" 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-neutral-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                Instructor Photo
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-1">
                <h3 className="font-sans font-medium text-lg">Sarah Johnson</h3>
                <InstructorBadge classification="certified" size="sm" />
              </div>
              <p className="text-accent-purple font-medium">Pottery Expert</p>
              <p className="mt-2 text-neutral-600 text-sm line-clamp-3">
                Certified pottery instructor with 10+ years of experience teaching all skill levels. Join Sarah's classes for expert guidance in a supportive environment.
              </p>
            </div>
          </a>
          
          <a 
            href="/instructor/2" 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-neutral-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                Instructor Photo
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-1">
                <h3 className="font-sans font-medium text-lg">Michael Chen</h3>
                <InstructorBadge classification="host" size="sm" />
              </div>
              <p className="text-accent-purple font-medium">Cooking Enthusiast</p>
              <p className="mt-2 text-neutral-600 text-sm line-clamp-3">
                Passionate home cook sharing family recipes and cooking techniques. Michael's classes are perfect for those wanting to learn authentic Asian cuisine.
              </p>
            </div>
          </a>
          
          <a 
            href="/instructor/3" 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-neutral-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                Instructor Photo
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-1">
                <h3 className="font-sans font-medium text-lg">Emma Wilson</h3>
                <InstructorBadge classification="certified" size="sm" />
              </div>
              <p className="text-accent-purple font-medium">Photography Pro</p>
              <p className="mt-2 text-neutral-600 text-sm line-clamp-3">
                Award-winning photographer with a focus on teaching practical skills. Emma's classes cover everything from basic techniques to advanced editing.
              </p>
            </div>
          </a>
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/browse" 
            className="inline-flex items-center text-accent-purple hover:text-accent-purple/90 font-medium"
          >
            Explore all instructors
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="pt-12 sm:pt-16 md:pt-20">
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
