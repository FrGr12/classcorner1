import { useParams } from "react-router-dom";
import { mockClasses } from "@/data/mockClasses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, User2 } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const ClassDetails = () => {
  const { id, category } = useParams();
  
  // Find the class from mockClasses
  const classItem = Object.values(mockClasses)
    .flat()
    .find(item => item.id.toString() === id && item.category === category);

  if (!classItem) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container-padding pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Class not found</h1>
            <p className="text-neutral-600">The class you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const dates = Array.isArray(classItem.date) ? classItem.date : [classItem.date];

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container-padding pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Image and basic info */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg" />
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="bg-white text-primary border-none">
                  {classItem.category}
                </Badge>
                <Badge variant="secondary" className="bg-white text-primary border-none">
                  {classItem.level}
                </Badge>
              </div>
            </div>

            {/* Right column - Details and booking */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold mb-2">{classItem.title}</h1>
                <div className="flex items-center gap-4 text-neutral-600">
                  <div className="flex items-center gap-1">
                    <User2 className="w-4 h-4" />
                    <span>{classItem.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{classItem.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{classItem.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm space-y-4">
                <h2 className="text-xl font-semibold">Available Dates</h2>
                <div className="grid grid-cols-2 gap-2">
                  {dates.map((date, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      {format(new Date(date), 'MMM d, yyyy')}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Price per class</p>
                    <p className="text-2xl font-semibold">${classItem.price}</p>
                  </div>
                  <Button size="lg" className="px-8">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Description section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">About this class</h2>
            <p className="text-neutral-600 leading-relaxed">
              Join {classItem.instructor} for an immersive {classItem.category.toLowerCase()} experience. 
              This {classItem.level.toLowerCase()}-level class is perfect for those looking to 
              {classItem.level === 'Beginner' ? ' start their journey in' : ' advance their skills in'} {classItem.category.toLowerCase()}.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClassDetails;