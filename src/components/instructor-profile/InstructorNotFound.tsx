
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

export const InstructorNotFound = () => {
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
};

export default InstructorNotFound;
