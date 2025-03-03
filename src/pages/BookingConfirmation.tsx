
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ClassItem } from "@/types/class";
import { ArrowLeft, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Booking } from "@/types/booking";
import ClassInfoSummary from "@/components/booking/ClassInfoSummary";
import GuestBookingForm from "@/components/booking/GuestBookingForm";
import BookingDetailsCard from "@/components/booking/BookingDetailsCard";
import BookingFooterActions from "@/components/booking/BookingFooterActions";

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
        
        <ClassInfoSummary classItem={classItem} />
        
        <Card>
          <CardHeader>
            <CardTitle>{isGuestBooking ? "Guest Information" : "Booking Details"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGuestBooking ? (
              <GuestBookingForm
                guestEmail={guestEmail}
                firstName={firstName}
                lastName={lastName}
                setGuestEmail={setGuestEmail}
                setFirstName={setFirstName}
                setLastName={setLastName}
              />
            ) : (
              <BookingDetailsCard 
                classItem={classItem}
                isGuestBooking={isGuestBooking}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
            <BookingFooterActions
              booking={booking}
              isSubmitting={isSubmitting}
              isGuestBooking={isGuestBooking}
              handleAction={isGuestBooking ? handleGuestBooking : handleProceedToPayment}
              isDisabled={isSubmitting || (isGuestBooking && (!guestEmail || !firstName || !lastName))}
            />
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
