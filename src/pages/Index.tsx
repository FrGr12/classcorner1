
import { Suspense } from "react";
import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Reviews from "@/components/landing/Reviews";
import Categories from "@/components/landing/Categories";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import TestimonialSection from "@/components/class-details/TestimonialSection";
import { Skeleton } from "@/components/ui/skeleton";

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
          {/* Instructor Cards - These would ideally be populated from an API */}
          {[1, 2, 3].map((id) => (
            <a 
              key={id} 
              href={`/instructor/${id}`} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-neutral-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  Instructor Photo
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-sans font-medium text-lg">Instructor Name</h3>
                <p className="text-accent-purple font-medium">Specialty</p>
                <p className="mt-2 text-neutral-600 text-sm line-clamp-3">
                  Passionate instructor with years of experience. Join their classes to learn hands-on skills in a supportive environment.
                </p>
              </div>
            </a>
          ))}
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
      <div className="pt-16 sm:pt-20 md:pt-24">
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
