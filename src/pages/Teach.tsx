
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import CourseMatches from "@/components/teach/crm/CourseMatches";
import Communications from "@/components/teach/crm/Communications";
import MatchInsights from "@/components/teach/crm/MatchInsights";

const Teach = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="heading-md mb-4">Course Match Insights</h2>
            <p className="text-neutral-600 mb-8">
              View and manage potential participants based on interests and location.
            </p>
            <MatchInsights />
          </div>

          <div>
            <h2 className="heading-md mb-4">Communications</h2>
            <p className="text-neutral-600 mb-8">
              Manage your communications with students.
            </p>
            <Communications />
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
