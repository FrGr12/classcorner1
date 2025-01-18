import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ClassItem } from "@/types/class";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classItem = location.state?.classItem as ClassItem;

  if (!classItem) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-neutral-600 mb-8">
            Thank you for your booking. Check your email for more details.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div>
                <h3 className="font-medium">Class</h3>
                <p className="text-neutral-600">{classItem.title}</p>
              </div>
              <div>
                <h3 className="font-medium">Date</h3>
                <p className="text-neutral-600">
                  {format(new Date(classItem.date), "MMMM d, yyyy")}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-neutral-600">{classItem.city}</p>
              </div>
              <div>
                <h3 className="font-medium">Amount Paid</h3>
                <p className="text-neutral-600">${classItem.price}</p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button onClick={() => navigate("/")} variant="outline" className="w-full">
                Return Home
              </Button>
              <Button onClick={() => window.print()} variant="secondary" className="w-full">
                Print Receipt
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSuccess;