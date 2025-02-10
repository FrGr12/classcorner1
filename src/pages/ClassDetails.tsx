
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { mockClasses } from "@/data/mockClasses";
import ImageCarousel from "@/components/landing/class-card/ImageCarousel";
import SaveButton from "@/components/landing/class-card/SaveButton";
import ClassHeader from "@/components/class-details/ClassHeader";
import ClassDates from "@/components/class-details/ClassDates";
import AboutClass from "@/components/class-details/AboutClass";
import LearningSection from "@/components/class-details/LearningSection";
import PreparationInfo from "@/components/class-details/PreparationInfo";
import LocationInfo from "@/components/class-details/LocationInfo";
import InstructorInfo from "@/components/class-details/InstructorInfo";
import TestimonialSection from "@/components/class-details/TestimonialSection";
import PolicyInfo from "@/components/class-details/PolicyInfo";
import PhotoGallery from "@/components/class-details/PhotoGallery";

const ClassDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

  const classItem = category && mockClasses[category]?.find(c => c.id === Number(id));

  if (!classItem) {
    navigate("/");
    return null;
  }

  const handleBooking = () => {
    if (!selectedDate) {
      const datesSection = document.querySelector('#dates-section');
      if (datesSection) {
        datesSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate("/booking-confirmation", { 
      state: { 
        classItem: {
          ...classItem,
          date: selectedDate
        } 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <PhotoGallery images={classItem.images} title={classItem.title} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="glass-panel rounded-xl p-6 md:p-8 mb-8 shadow-lg">
          <ClassHeader classItem={classItem} onBooking={handleBooking} />
          <div id="dates-section">
            <ClassDates 
              classItem={classItem} 
              selectedDate={selectedDate}
            />
          </div>
        </div>

        <div className="space-y-12">
          <AboutClass classItem={classItem} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LearningSection />
            <PreparationInfo />
          </div>
          <LocationInfo classItem={classItem} />
          <InstructorInfo classItem={classItem} />
          <TestimonialSection />
          <PolicyInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClassDetails;
