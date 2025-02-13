
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PaymentConfirmationData {
  bookingId: number;
  paymentId: string;
  receiptUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { bookingId, paymentId, receiptUrl }: PaymentConfirmationData = await req.json();

    // Fetch booking details with related information
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select(`
        *,
        student:profiles!bookings_student_id_fkey(
          first_name,
          email
        ),
        course:courses(
          title,
          location,
          instructor:profiles!courses_instructor_id_fkey(
            first_name,
            last_name
          )
        ),
        session:course_sessions(
          start_time
        )
      `)
      .eq("id", bookingId)
      .single();

    if (bookingError) throw bookingError;

    // Format date and time
    const classDate = new Date(booking.session.start_time);
    const formattedDate = classDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = classDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    // Send confirmation email
    const { data: emailResponse, error: emailError } = await resend.emails.send({
      from: "Lovable Classes <classes@yourdomain.com>",
      to: [booking.student.email],
      subject: "Your Class Booking is Confirmed!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; margin-bottom: 24px;">Your Booking is Confirmed!</h1>
          
          <p>Hi ${booking.student.first_name},</p>
          
          <p>Great news! Your booking for "${booking.course.title}" has been confirmed.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h2 style="margin-top: 0; color: #333;">Class Details</h2>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Location:</strong> ${booking.course.location}</p>
            <p><strong>Instructor:</strong> ${booking.course.instructor.first_name} ${booking.course.instructor.last_name}</p>
          </div>

          <p>You can view your receipt here: <a href="${receiptUrl}">View Receipt</a></p>
          
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            If you have any questions, please don't hesitate to contact us.
          </p>
        </div>
      `,
    });

    if (emailError) throw emailError;

    // Log the notification
    const { error: logError } = await supabase
      .from("notification_logs")
      .insert({
        user_id: booking.student_id,
        notification_type: "payment_confirmation",
        content: `Payment confirmed for ${booking.course.title}`,
        status: "sent",
        booking_id: bookingId,
      });

    if (logError) throw logError;

    console.log("Payment confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending payment confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
