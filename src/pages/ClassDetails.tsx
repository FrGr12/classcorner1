
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
import ClassVideo from "@/components/class-details/ClassVideo";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ClassDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialSelectedDate = location.state?.selectedDate;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialSelectedDate);

  // Update selected date when location state changes
  useEffect(() => {
    if (location.state?.selectedDate) {
      console.log("ClassDetails: location.state.selectedDate changed:", location.state.selectedDate);
      setSelectedDate(location.state.selectedDate);
    }
  }, [location.state]);

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
      toast.error("Please select a date before proceeding");
      const datesSection = document.querySelector('#dates-section');
      if (datesSection) {
        datesSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    console.log("ClassDetails: handleBooking - navigating to booking-confirmation with date:", selectedDate);
    
    // Directly navigate to booking confirmation with the selected date
    navigate("/booking-confirmation", { 
      state: { 
        classItem: {
          ...classItem,
          date: selectedDate
        } 
      } 
    });
  };

  const handleDateSelect = (date: Date) => {
    console.log("Date selected in ClassDetails:", date);
    setSelectedDate(date);
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
      <div className="w-full mt-[72px] bg-white py-4 sm:py-8">
        <div className="w-full mx-auto">
          <ImageCarousel images={classItem.images} title={classItem.title} variant="large" />
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="glass-panel rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 mt-6 sm:mt-8">
          <ClassHeader classItem={classItem} onBooking={handleBooking} />
          <div id="dates-section" className="mt-2 sm:mt-4">
            <ClassDates 
              classItem={classItem} 
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          <AboutClass classItem={classItem} />
          {classItem.videoUrl && (
            <div className="glass-panel rounded-xl p-4 sm:p-6 md:p-8">
              <ClassVideo videoUrl={classItem.videoUrl} title={classItem.title} />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
