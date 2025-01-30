import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { ArrowLeft, Clock, MapPin, Users, Star } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classItem = location.state?.classItem as ClassItem;

  if (!classItem) {
    navigate("/");
    return null;
  }

  const handleProceedToPayment = () => {
    navigate("/payment", { state: { classItem } });
  };

  const handleGoBack = () => {
    navigate(`/class/${classItem.category}/${classItem.id}`);
  };

  const formatClassDate = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      return format(date[0], "MMMM d, yyyy");
    }
    return format(date, "MMMM d, yyyy");
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="mb-6 gap-2 text-base hover:bg-neutral-100"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to class details
          </Button>

          <div className="glass-panel rounded-xl p-6 md:p-8 mb-8">
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

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Instructor</p>
                  <p className="text-base">{classItem.instructor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">Location</p>
                  <p className="text-base">{classItem.city} Studio</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">Date & Time</p>
                  <p className="text-base">{formatClassDate(classItem.date)}</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">Booking Confirmation</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Class</h3>
                <p className="text-neutral-600">{classItem.title}</p>
              </div>
              <div>
                <h3 className="font-medium">Instructor</h3>
                <p className="text-neutral-600">{classItem.instructor}</p>
              </div>
              <div>
                <h3 className="font-medium">Date</h3>
                <p className="text-neutral-600">
                  {formatClassDate(classItem.date)}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-neutral-600">{classItem.city} Studio</p>
                <p className="text-neutral-600">123 Creative Street</p>
                <p className="text-neutral-600">{classItem.city}, Sweden</p>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Price</span>
                <span className="text-xl font-semibold">${classItem.price}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4 pt-6">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleGoBack}
                className="w-full text-base"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleProceedToPayment} 
                size="lg"
                className="w-full text-base"
              >
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;