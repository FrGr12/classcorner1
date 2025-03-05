
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateButtons from "@/components/landing/class-card/DateButtons";
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ClassDatesProps {
  classItem: ClassItem;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const BOOKING_STORAGE_KEY = "incomplete_booking";

const ClassDates = ({ classItem, selectedDate, onDateSelect }: ClassDatesProps) => {
  const navigate = useNavigate();
  const dates = Array.isArray(classItem.date) ? classItem.date : [classItem.date];

  const saveBookingToStorage = (date: Date) => {
    const bookingData = {
      classId: classItem.id,
      className: classItem.title,
      selectedDate: date.toISOString(),
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookingData));
  };

  const handleBooking = async (date: Date) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Save booking data before redirecting to auth
        saveBookingToStorage(date);
        toast.info("Please log in to continue with your booking");
        navigate("/auth", { state: { returnTo: window.location.pathname } });
        return;
      }

      // Get the session ID for the selected date
      const { data: session, error: sessionError } = await supabase
        .from('course_sessions')
        .select('id')
        .eq('course_id', classItem.id)
        .eq('start_time', date.toISOString())
        .single();

      if (sessionError || !session) {
        toast.error("Session not found");
        return;
      }

      // Clear any saved incomplete booking data
      localStorage.removeItem(BOOKING_STORAGE_KEY);

      navigate("/booking-confirmation", { 
        state: { 
          classItem: {
            ...classItem,
            date: date,
            sessionId: session.id
          }
        }
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to process booking");
    }
  };
  
  return (
    <>
      <Separator className="my-6" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Available Dates</h3>
        </div>
        
        {selectedDate && (
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h4 className="font-medium mb-2">Selected Date:</h4>
            <p className="text-neutral-600">
              {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Class duration: {classItem.duration || '2 hours'}
            </p>
          </div>
        )}
        
        <DateButtons 
          dates={dates}
          price={classItem.price}
          selectedDate={selectedDate}
          classId={classItem.id}
          category={classItem.category}
          onDateSelect={handleBooking}
        />
      </div>
    </>
  );
};

export default ClassDates;
