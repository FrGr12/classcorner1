import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar, Mail, Phone } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { mockClasses } from "@/data/mockClasses";
import { Separator } from "@/components/ui/separator";
import ImageCarousel from "@/components/landing/class-card/ImageCarousel";
import DateButtons from "@/components/landing/class-card/DateButtons";
import SaveButton from "@/components/landing/class-card/SaveButton";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";

const ClassDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const classItem = category && mockClasses[category]?.find(c => c.id === Number(id));

  if (!classItem) {
    navigate("/");
    return null;
  }

  const handleBooking = () => {
    navigate("/booking-confirmation", { state: { classItem } });
  };

  // Mock testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      date: "March 15, 2024",
      rating: 5,
      comment: "Amazing class! The instructor was very knowledgeable and patient. I learned so much and created a beautiful piece.",
    },
    {
      name: "Michael Chen",
      date: "March 10, 2024",
      rating: 4,
      comment: "Great introduction to pottery. The small class size meant we got lots of individual attention.",
    },
    {
      name: "Emma Wilson",
      date: "March 5, 2024",
      rating: 5,
      comment: "Exceeded my expectations! The studio is well-equipped and the atmosphere is very welcoming.",
    },
  ];

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
          <SaveButton />
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-24">
        {/* Quick Summary Card */}
        <div className="glass-panel rounded-xl p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{classItem.title}</h1>
                <p className="text-neutral-600">{classItem.category}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
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
              <div className="flex gap-2">
                <Button 
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={handleBooking}
                >
                  Book Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full md:w-auto"
                  onClick={() => {
                    // Handle private booking request
                    console.log('Private booking requested');
                  }}
                >
                  Request Private Class
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Available Dates</h3>
              <Button variant="ghost" size="sm" className="text-accent-purple">
                <Calendar className="w-4 h-4 mr-2" />
                View full calendar
              </Button>
            </div>
            <DateButtons 
              dates={Array.isArray(classItem.date) ? classItem.date : [classItem.date]}
              price={classItem.price}
              maxParticipants={classItem.maxParticipants}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* About This Class */}
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">About This Class</h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-600 leading-relaxed">
                Join {classItem.instructor} for an immersive {classItem.title.toLowerCase()} experience. 
                This hands-on class is perfect for {classItem.level.toLowerCase()} learners looking to develop their skills
                in a supportive environment.
              </p>
            </div>
          </section>

          {/* What You'll Learn */}
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
            <ul className="space-y-4 text-neutral-600">
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
          </section>

          {/* What to Bring */}
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">What to Bring</h2>
            <ul className="space-y-4 text-neutral-600">
              <li className="flex items-start gap-2">
                • Comfortable clothing suitable for crafting
              </li>
              <li className="flex items-start gap-2">
                • Note-taking materials (optional)
              </li>
            </ul>
          </section>

          {/* Location */}
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Location</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-neutral-600">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{classItem.city} Studio</p>
                  <p>123 Creative Street</p>
                  <p>{classItem.city}, Sweden</p>
                  <p className="mt-2 text-sm">Free street parking available</p>
                  <p className="text-sm">5 min walk from Central Station</p>
                </div>
              </div>
              <div className="aspect-video bg-neutral-100 rounded-lg mt-6">
                {/* Map will be implemented here */}
              </div>
            </div>
          </section>

          {/* About the Instructor */}
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex-shrink-0" />
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">{classItem.instructor}</h3>
                  <p className="text-neutral-600">Expert Craftsperson</p>
                </div>
                <p className="text-neutral-600">
                  An experienced instructor with over 10 years of teaching experience, passionate about sharing creative skills
                  and helping students discover their artistic potential.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">What Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </section>

          {/* Class Policies */}
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Class Policies</h2>
            <div className="space-y-4 text-neutral-600">
              <div>
                <h3 className="font-medium text-primary mb-2">Cancellation Policy</h3>
                <p>Full refund up to 48 hours before the class. No refunds within 48 hours of the class start time.</p>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">Group Bookings</h3>
                <p>Available for 6 or more participants. Contact the instructor for special rates and arrangements.</p>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">Private Sessions</h3>
                <p>One-on-one instruction available upon request. Contact for pricing and availability.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClassDetails;