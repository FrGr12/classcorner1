import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Star } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { mockClasses } from "@/data/mockClasses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ImageCarousel from "@/components/landing/class-card/ImageCarousel";
import DateButtons from "@/components/landing/class-card/DateButtons";

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
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative">
        <Button
          variant="outline"
          size="lg"
          className="absolute top-4 left-4 z-10 gap-2 text-base bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to browse
        </Button>
        
        <div className="h-[60vh] relative">
          <ImageCarousel 
            images={classItem.images} 
            title={classItem.title}
          />
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Quick Summary Card */}
        <div className="glass-panel rounded-xl p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{classItem.title}</h1>
                <p className="text-neutral-600">{classItem.category}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>2 hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{classItem.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Max {classItem.maxParticipants} people</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent-purple text-accent-purple" />
                  <span>{classItem.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-right">
                <p className="text-2xl font-bold">${classItem.price}</p>
                <p className="text-sm text-neutral-600">per person</p>
              </div>
              <Button 
                size="lg"
                className="w-full md:w-auto"
                onClick={handleBooking}
              >
                Book Now
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-medium">Available Dates</h3>
            <DateButtons 
              dates={Array.isArray(classItem.date) ? classItem.date : [classItem.date]} 
            />
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 space-x-8">
            <TabsTrigger 
              value="overview"
              className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="details"
              className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Class Details
            </TabsTrigger>
            <TabsTrigger 
              value="location"
              className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Location
            </TabsTrigger>
            <TabsTrigger 
              value="instructor"
              className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Instructor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">About This Class</h2>
              <p className="text-neutral-600 leading-relaxed">
                Join {classItem.instructor} for an immersive {classItem.title.toLowerCase()} experience. 
                This hands-on class is perfect for {classItem.level.toLowerCase()} learners looking to develop their skills
                in a supportive environment.
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start gap-2">
                  • Understanding basic techniques and principles
                </li>
                <li className="flex items-start gap-2">
                  • Hands-on practice with expert guidance
                </li>
                <li className="flex items-start gap-2">
                  • Tips and tricks from an experienced instructor
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-8">
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">What to Bring</h2>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start gap-2">
                  • Comfortable clothing suitable for crafting
                </li>
                <li className="flex items-start gap-2">
                  • Note-taking materials (optional)
                </li>
              </ul>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Class Policies</h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  <strong>Cancellation Policy:</strong> Full refund up to 48 hours before the class
                </p>
                <p>
                  <strong>Group Bookings:</strong> Available for 6 or more participants
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-8">
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Location Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-neutral-600">
                  <MapPin className="h-5 w-5 mt-1" />
                  <div>
                    <p className="font-medium">{classItem.city} Studio</p>
                    <p>123 Creative Street</p>
                    <p>{classItem.city}, Sweden</p>
                  </div>
                </div>
                <div className="aspect-video bg-neutral-100 rounded-lg">
                  {/* Map will be implemented here */}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="instructor" className="space-y-8">
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">About the Instructor</h2>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-neutral-100 rounded-full" />
                <div className="space-y-2">
                  <h3 className="font-medium">{classItem.instructor}</h3>
                  <p className="text-neutral-600">
                    An experienced instructor with a passion for teaching and sharing creative skills.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ClassDetails;