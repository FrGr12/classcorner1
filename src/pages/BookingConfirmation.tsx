import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

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

          <h1 className="text-3xl font-bold mb-8">Booking Confirmation</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Class Details</CardTitle>
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
                <p className="text-neutral-600">{classItem.city}</p>
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