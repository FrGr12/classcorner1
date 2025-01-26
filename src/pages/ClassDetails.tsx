import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { mockClasses } from "@/data/mockClasses";
import { ArrowLeft } from "lucide-react";

const ClassDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  // Find the class in the mock data
  const classItem = category && mockClasses[category]?.find(c => c.id === Number(id));

  if (!classItem) {
    navigate("/");
    return null;
  }

  const handleBooking = () => {
    navigate("/booking-confirmation", { state: { classItem } });
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="outline"
          size="lg"
          className="mb-6 gap-2 text-base hover:bg-neutral-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to browse
        </Button>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{classItem.title}</h1>
          <p className="text-gray-600 mb-2">Instructor: {classItem.instructor}</p>
          <p className="text-gray-600 mb-2">Location: {classItem.city}</p>
          <p className="text-gray-600 mb-2">Price: ${classItem.price}</p>
          <p className="text-gray-600 mb-4">Date: {Array.isArray(classItem.date) ? classItem.date.join(', ') : classItem.date.toString()}</p>
          <Button onClick={handleBooking} className="w-full">Book Now</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClassDetails;
