
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import ClassInfoSummary from "@/components/booking/ClassInfoSummary";
import GuestBookingForm from "@/components/booking/GuestBookingForm";
import BookingDetailsCard from "@/components/booking/BookingDetailsCard";
import BookingFooterActions from "@/components/booking/BookingFooterActions";
import BackButton from "@/components/booking/BackButton";
import BookingAlert from "@/components/booking/BookingAlert";
import { useBookingConfirmation } from "@/hooks/useBookingConfirmation";

const BookingConfirmation = () => {
  const {
    classItem,
    booking,
    isSubmitting,
    guestEmail,
    firstName,
    lastName,
    isGuestBooking,
    setGuestEmail,
    setFirstName,
    setLastName,
    handleGuestBooking,
    handleProceedToPayment,
    handleGoBack
  } = useBookingConfirmation();

  // If we're still checking or no class item was found, don't render the full page
  if (!classItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BackButton onClick={handleGoBack} isGuestBooking={isGuestBooking} />

        <h1 className="text-3xl font-bold mb-8">Booking Confirmation</h1>

        {!isGuestBooking && <BookingAlert />}
        
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
              classItem={classItem}
            />
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
