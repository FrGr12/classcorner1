
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
  isDefault: boolean;
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

    // Get the current user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    const { data: { user }, error: userError } = await supabaseClient.auth
      .getUser(authHeader.replace('Bearer ', ''));

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Get request body
    const { paymentMethodId, isDefault } = await req.json() as RequestBody;

    if (!paymentMethodId) {
      throw new Error("Missing payment method ID");
    }

    // Get payment method details from Stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    
    if (!paymentMethod.card) {
      throw new Error("Invalid payment method");
    }

    // Check if user already has a Stripe customer ID
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('id, stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    let customerId = profile.stripe_customer_id;

    // Create a customer if not exists
    if (!customerId) {
      const { data: userData } = await supabaseClient
        .from('profiles')
        .select('email, first_name, last_name')
        .eq('id', user.id)
        .single();

      const customer = await stripe.customers.create({
        email: userData.email,
        name: `${userData.first_name} ${userData.last_name}`.trim(),
        metadata: {
          user_id: user.id
        }
      });

      customerId = customer.id;

      // Update profile with Stripe customer ID
      await supabaseClient
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Make it the default payment method if specified
    if (isDefault) {
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // If isDefault is true, set all other payment methods to not default
    if (isDefault) {
      await supabaseClient
        .from('user_payment_methods')
        .update({ is_default: false })
        .eq('user_id', user.id);
    }

    // Save payment method to database
    const { error: insertError } = await supabaseClient
      .from('user_payment_methods')
      .upsert({
        id: paymentMethodId,
        user_id: user.id,
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
        is_default: isDefault,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({
        success: true,
        paymentMethod: {
          id: paymentMethodId,
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
          is_default: isDefault
        }
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
