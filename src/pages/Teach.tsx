import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import CourseForm from "@/components/teach/CourseForm";
import CourseMatches from "@/components/teach/crm/CourseMatches";
import EngagementMetrics from "@/components/teach/analytics/EngagementMetrics";
import PerformanceMetrics from "@/components/teach/analytics/PerformanceMetrics";

const Teach = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EngagementMetrics />
            <PerformanceMetrics />
          </div>

          <div>
            <h1 className="heading-lg mb-4">Create a New Course</h1>
            <p className="text-neutral-600 mb-8">
              Share your expertise with eager students in your local community.
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <CourseForm />
            </div>
          </div>

          <div>
            <h2 className="heading-md mb-4">Course Matches</h2>
            <p className="text-neutral-600 mb-8">
              View and manage potential participants who match your courses.
            </p>
            <CourseMatches />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Teach;