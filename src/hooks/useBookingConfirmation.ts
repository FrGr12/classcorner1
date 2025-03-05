
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassItem } from "@/types/class";
import { Booking } from "@/types/booking";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useBookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [classItem, setClassItem] = useState<ClassItem & { sessionId?: number } | null>(
    location.state?.classItem || null
  );
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isGuestBooking, setIsGuestBooking] = useState(false);

  useEffect(() => {
    console.log("BookingConfirmation: location.state:", location.state);
    if (location.state?.classItem) {
      setClassItem(location.state.classItem);
    } else if (!classItem) {
      console.log("BookingConfirmation: No class item found, redirecting to browse");
      navigate("/browse", { 
        replace: true,
        state: { error: "No class selected. Please choose a class first." }
      });
    }
  }, [location, navigate, classItem]);

  const handleGuestBooking = async () => {
    try {
      setIsSubmitting(true);
      
      if (!classItem) {
        toast.error("No class selected. Please choose a class first.");
        return;
      }
      
      console.log("Creating guest booking with date:", classItem.date);
      
      // Convert the date to an ISO string if it's a Date object
      const selectedDate = classItem.date instanceof Date 
        ? classItem.date.toISOString() 
        : Array.isArray(classItem.date) && classItem.date.length > 0
          ? classItem.date[0].toISOString()
          : null;
      
      // First, check if the course exists in the database
      const { data: courseExists, error: courseCheckError } = await supabase
        .from('courses')
        .select('id')
        .eq('id', classItem.id)
        .single();

      if (courseCheckError) {
        // If the course doesn't exist in production, create a "stub" entry for it
        // This is a workaround for demo purposes only
        const { data: newCourse, error: createCourseError } = await supabase
          .from('courses')
          .insert({
            id: classItem.id,
            title: classItem.title,
            price: classItem.price,
            instructor: classItem.instructor,
            category: classItem.category || 'Other',
            location: classItem.city,
            description: `This is a demo course for ${classItem.title}`,
            status: 'published'
          })
          .select()
          .single();

        if (createCourseError) {
          throw new Error(`Failed to create course: ${createCourseError.message}`);
        }
      }

      const { data, error } = await supabase
        .from('guest_bookings')
        .insert({
          email: guestEmail,
          first_name: firstName,
          last_name: lastName,
          course_id: classItem.id,
          selected_date: selectedDate,
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
      
      if (!classItem) {
        toast.error("No class selected. Please choose a class first.");
        return;
      }
      
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

    if (classItem?.id && classItem?.category) {
      navigate(`/class/${classItem.category}/${classItem.id}`);
    } else {
      navigate("/browse");
    }
  };

  return {
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
  };
}
