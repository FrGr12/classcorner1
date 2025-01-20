import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import CourseForm from "@/components/teach/CourseForm";

const Teach = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-lg mb-4">Create a New Course</h1>
          <p className="text-neutral-600 mb-8">
            Share your expertise with eager students in your local community.
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <CourseForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Teach;