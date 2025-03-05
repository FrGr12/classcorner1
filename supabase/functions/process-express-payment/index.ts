
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Stripe } from "https://esm.sh/stripe@12.6.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  paymentMethodId: string;
  bookingId: number;
  amount: number;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get request body
    const { paymentMethodId, bookingId, amount } = await req.json() as RequestBody;

    if (!paymentMethodId || !bookingId || !amount) {
      throw new Error("Missing required parameters");
    }

    // Get booking details
    const { data: booking, error: bookingError } = await supabaseClient
      .from('bookings')
      .select('*, student:profiles!bookings_student_id_fkey(*)')
      .eq('id', bookingId)
      .single();

    if (bookingError) throw bookingError;
    if (!booking) throw new Error("Booking not found");

    if (!booking.student.stripe_customer_id) {
      throw new Error("Student has no associated Stripe customer");
    }

    // Create payment intent using the saved payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_method: paymentMethodId,
      customer: booking.student.stripe_customer_id,
      confirm: true,
      return_url: `${req.headers.get("origin") || ""}/payment-receipt?booking_id=${bookingId}`,
      off_session: true,
      confirm_payment_method_reuse: "merchant_consent_provided"
    });

    // Store payment intent details
    const { error: insertError } = await supabaseClient
      .from("payment_transactions")
      .insert({
        booking_id: bookingId,
        amount,
        stripe_payment_intent_id: paymentIntent.id,
        stripe_client_secret: paymentIntent.client_secret,
        payment_method_id: paymentMethodId,
        is_express_checkout: true
      });

    if (insertError) throw insertError;

    // Update booking status
    const { error: updateError } = await supabaseClient
      .from("bookings")
      .update({
        payment_status: paymentIntent.status === "succeeded" ? "paid" : "processing",
        status: paymentIntent.status === "succeeded" ? "confirmed" : "pending"
      })
      .eq("id", bookingId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({
        success: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
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
