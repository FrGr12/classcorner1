import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { ArrowLeft, Clock, MapPin, Users, Star, Info, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CancellationDialog from "@/components/class-details/CancellationDialog";
import RescheduleDialog from "@/components/class-details/RescheduleDialog";
import type { Booking } from "@/types/booking";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classItem = location.state?.classItem as (ClassItem & { sessionId?: number });
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isGuestBooking, setIsGuestBooking] = useState(false);

  if (!classItem) {
    navigate("/browse", { 
      replace: true,
      state: { error: "No class selected. Please choose a class first." }
    });
    return null;
  }

  const handleGuestBooking = async () => {
    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from('guest_bookings')
        .insert({
          email: guestEmail,
          first_name: firstName,
          last_name: lastName,
          course_id: classItem.id,
          selected_date: classItem.date,
          total_price: classItem.price,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Booking initiated! Please check your email to complete the process.");
      
      navigate("/booking-success", { 
        state: { 
          isGuest: true,
          email: guestEmail
        }
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create guest booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedToPayment = async () => {
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsGuestBooking(true);
        return;
      }

      const { data: newBooking, error } = await supabase
        .from('bookings')
        .insert({
          course_id: classItem.id,
          student_id: user.id,
          selected_date: classItem.date,
          total_price: classItem.price,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      setBooking(newBooking);
      
      navigate("/payment", { 
        state: { 
          classItem,
          bookingId: newBooking.id
        }
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    if (isGuestBooking) {
      setIsGuestBooking(false);
      return;
    }

    if (classItem.id && classItem.category) {
      navigate(`/class/${classItem.category}/${classItem.id}`);
    } else {
      navigate("/browse");
    }
  };

  const formatClassDateTime = (date: Date | Date[]) => {
    try {
      if (Array.isArray(date)) {
        return {
          date: format(new Date(date[0]), "MMMM d, yyyy"),
          time: format(new Date(date[0]), "h:mm a")
        };
      }
      return {
        date: format(new Date(date), "MMMM d, yyyy"),
        time: format(new Date(date), "h:mm a")
      };
    } catch (error) {
      console.error("Date formatting error:", error);
      return { date: "Invalid date", time: "Invalid time" };
    }
  };

  const dateTime = formatClassDateTime(classItem.date);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="outline"
          size="lg"
          className="mb-6 gap-2 text-base hover:bg-neutral-100"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-5 w-5" />
          {isGuestBooking ? "Back to booking details" : "Back to class details"}
        </Button>

        <h1 className="text-3xl font-bold mb-8">Booking Confirmation</h1>

        {!isGuestBooking && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Our flexible refund policy: Get a full refund if you cancel more than 48 hours before the class. 
              No refunds are available within 48 hours of the class start time.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="glass-panel rounded-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">{classItem.title}</h2>
              <p className="text-neutral-600">{classItem.category}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{classItem.duration || '2 hours'}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{classItem.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Max {classItem.maxParticipants || 10} people</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent-purple text-accent-purple" />
                <span>{classItem.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{isGuestBooking ? "Guest Information" : "Booking Details"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGuestBooking ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <Alert>
                  <AlertDescription className="text-sm">
                    You'll receive an email with instructions to create your account and complete the booking process.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-medium">Class</h3>
                  <p className="text-neutral-600">{classItem.title}</p>
                </div>
                <div>
                  <h3 className="font-medium">Instructor</h3>
                  <p className="text-neutral-600">{classItem.instructor}</p>
                </div>
                <div>
                  <h3 className="font-medium">Date & Time</h3>
                  <p className="text-neutral-600">
                    {dateTime.date} at {dateTime.time}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <div className="text-neutral-600">
                    <p>{classItem.city} Studio</p>
                    <p>123 Creative Street</p>
                    <p>{classItem.city}, Sweden</p>
                  </div>
                </div>
              </>
            )}
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Price</span>
              <span className="text-xl font-semibold">${classItem.price}</span>
            </div>

            {!isGuestBooking && (
              <Alert>
                <AlertDescription className="text-sm">
                  By proceeding with this booking, you acknowledge our cancellation policy. 
                  Cancellations made more than 48 hours before the class start time are eligible for a full refund.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
            {booking ? (
              <>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsCancellationOpen(true)}
                  className="w-full text-base"
                >
                  Cancel Booking
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setIsRescheduleOpen(true)}
                  className="w-full text-base"
                >
                  Reschedule
                </Button>
              </>
            ) : (
              <Button 
                onClick={isGuestBooking ? handleGuestBooking : handleProceedToPayment} 
                size="lg"
                className="w-full text-base"
                disabled={isSubmitting || (isGuestBooking && (!guestEmail || !firstName || !lastName))}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isGuestBooking ? "Continue as Guest" : "Proceed to Payment"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>

        {booking && (
          <>
            <RescheduleDialog
              booking={booking}
              isOpen={isRescheduleOpen}
              onOpenChange={setIsRescheduleOpen}
            />
            <CancellationDialog
              booking={booking}
              isOpen={isCancellationOpen}
              onOpenChange={setIsCancellationOpen}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
