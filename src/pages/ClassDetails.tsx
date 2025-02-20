
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
import CustomFAQSection from "@/components/class-details/CustomFAQSection";

const ClassDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

  // Find the class in mockClasses by matching the first word of the category
  const findClassItem = () => {
    if (!category || !id) return null;

    const categoryKey = Object.keys(mockClasses).find(key => 
      key.toLowerCase().startsWith(category.toLowerCase())
    );

    if (!categoryKey) return null;

    return mockClasses[categoryKey]?.find(c => c.id === Number(id));
  };

  const classItem = findClassItem();

  if (!classItem) {
    console.log('Class not found:', { category, id });
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

  const handleShowQuestion = () => {
    const questionButton = document.querySelector('[data-question-trigger]') as HTMLButtonElement;
    if (questionButton) {
      questionButton.click();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="w-full mt-[110px]">
        <div className="max-w-[1920px] mx-auto">
          <ImageCarousel images={classItem.images} title={classItem.title} variant="large" />
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="glass-panel rounded-xl p-6 md:p-8 mb-8 mt-[60px]">
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
          <InstructorInfo classItem={classItem} onShowQuestion={handleShowQuestion} />
          <div className="w-full">
            <ImageCarousel images={classItem.images} title={classItem.title} variant="small" />
          </div>
          <TestimonialSection />
          <CustomFAQSection onShowQuestion={handleShowQuestion} />
          <PolicyInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClassDetails;
