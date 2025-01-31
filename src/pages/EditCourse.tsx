import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import EditCourseForm from "@/components/teach/EditCourseForm";

const EditCourse = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="heading-lg mb-4">Edit Course</h1>
          <p className="text-neutral-600 mb-8">
            Update your course details and schedule.
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <EditCourseForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditCourse;