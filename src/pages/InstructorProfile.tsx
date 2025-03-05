
import { useParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import InstructorLoading from "@/components/instructor-profile/InstructorLoading";
import InstructorNotFound from "@/components/instructor-profile/InstructorNotFound";
import InstructorContent from "@/components/instructor-profile/InstructorContent";
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
    return <InstructorLoading />;
  }

  if (!instructor) {
    return <InstructorNotFound />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-24 mt-10">
        <InstructorContent 
          instructor={instructor}
          classes={classes}
          reviews={reviews}
          activeFilter={activeFilter}
          filterClasses={filterClasses}
        />
      </main>
      <Footer />
    </div>
  );
};

export default InstructorProfilePage;
