
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { ClassItem } from "@/types/class";
import InstructorHeader from "@/components/instructor-profile/InstructorHeader";
import InstructorBio from "@/components/instructor-profile/InstructorBio";
import InstructorClasses from "@/components/instructor-profile/InstructorClasses";
import InstructorReviews from "@/components/instructor-profile/InstructorReviews";
import ContactInstructor from "@/components/instructor-profile/ContactInstructor";

interface InstructorContentProps {
  instructor: InstructorProfile;
  classes: ClassItem[];
  reviews: InstructorReview[];
  activeFilter: string;
  filterClasses: (filter: string) => void;
}

const InstructorContent = ({
  instructor,
  classes,
  reviews,
  activeFilter,
  filterClasses
}: InstructorContentProps) => {
  return (
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
  );
};

export default InstructorContent;
