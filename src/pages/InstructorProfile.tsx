
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import InstructorHeader from "@/components/instructor-profile/InstructorHeader";
import InstructorBio from "@/components/instructor-profile/InstructorBio";
import InstructorClasses from "@/components/instructor-profile/InstructorClasses";
import InstructorReviews from "@/components/instructor-profile/InstructorReviews";
import ContactInstructor from "@/components/instructor-profile/ContactInstructor";
import { useInstructorProfile } from "@/hooks/useInstructorProfile";

const InstructorProfilePage = () => {
  const { id } = useParams();
  const {
    instructor,
    classes,
    reviews,
    isLoading,
    activeFilter,
    filterClasses
  } = useInstructorProfile(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Instructor Not Found</h1>
            <p className="text-neutral-600">The instructor you're looking for doesn't exist or has been removed.</p>
            <div className="mt-6 space-y-4">
              <p className="text-neutral-800 font-medium">Try one of our demo instructors:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/instructor/1" className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/90 transition-colors">
                  Sarah Johnson
                </a>
                <a href="/instructor/2" className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/90 transition-colors">
                  Michael Chen
                </a>
                <a href="/instructor/3" className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/90 transition-colors">
                  Marco Rossi
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-24 mt-10">
        <div className="max-w-7xl mx-auto">
          <InstructorHeader instructor={instructor} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <InstructorBio instructor={instructor} />
              <InstructorClasses 
                classes={classes} 
                activeFilter={activeFilter}
                onFilterChange={filterClasses}
              />
              <InstructorReviews reviews={reviews} instructor={instructor} />
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              <ContactInstructor instructor={instructor} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorProfilePage;
