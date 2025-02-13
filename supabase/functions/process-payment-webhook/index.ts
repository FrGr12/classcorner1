
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Stripe } from "https://esm.sh/stripe@12.6.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
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
      const { error: bookingError } = await supabaseClient
        .from("bookings")
        .update({
          payment_status: "paid",
          status: "confirmed"
        })
        .eq("id", transaction.booking_id);

      if (bookingError) throw bookingError;

      // Send confirmation email
      const response = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-payment-confirmation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({
            bookingId: transaction.booking_id,
            paymentId: paymentIntent.id,
            receiptUrl: paymentIntent.charges.data[0]?.receipt_url,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send confirmation email");
      }

      console.log("Payment processed and confirmation email sent successfully");
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
