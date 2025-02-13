
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Stripe } from "https://esm.sh/stripe@12.6.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Stripe webhook secret not configured");
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      // Update payment transaction
      const { data: transaction, error: transactionError } = await supabaseClient
        .from("payment_transactions")
        .update({
          payment_status: "completed",
          receipt_url: paymentIntent.charges.data[0]?.receipt_url,
        })
        .eq("stripe_payment_intent_id", paymentIntent.id)
        .select("booking_id")
        .single();

      if (transactionError) throw transactionError;

      // Update booking status
      const { data: booking, error: bookingError } = await supabaseClient
        .from("bookings")
        .update({
          payment_status: "paid",
          status: "confirmed"
        })
        .eq("id", transaction.booking_id)
        .select(`
          id,
          course:courses(
            title,
            instructor_id
          ),
          student:profiles!bookings_student_id_fkey(
            email,
            first_name
          )
        `)
        .single();

      if (bookingError) throw bookingError;

      // Send confirmation email
      await resend.emails.send({
        from: "Lovable <bookings@yourdomain.com>",
        to: booking.student.email,
        subject: "Booking Confirmed - Payment Received",
        html: `
          <h1>Thank you for your payment!</h1>
          <p>Dear ${booking.student.first_name},</p>
          <p>Your payment for "${booking.course.title}" has been received and your booking is now confirmed.</p>
          <p>You can view your receipt here: ${paymentIntent.charges.data[0]?.receipt_url}</p>
          <p>We look forward to seeing you in class!</p>
        `,
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
