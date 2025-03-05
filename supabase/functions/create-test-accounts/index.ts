
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    console.log("Creating test accounts...");

    // Test account credentials
    const testAccounts = [
      {
        email: "test.student@classcorner.demo",
        password: "classcorner2024",
        userData: {
          first_name: "Test",
          last_name: "Student",
          user_type: "student"
        }
      },
      {
        email: "test.teacher@classcorner.demo",
        password: "classcorner2024",
        userData: {
          first_name: "Test",
          last_name: "Teacher",
          user_type: "teacher"
        }
      }
    ];

    const results = [];

    for (const account of testAccounts) {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(
        account.email
      );

      if (existingUser) {
        console.log(`User ${account.email} already exists`);
        results.push({
          email: account.email,
          status: "already exists",
          password: account.password
        });
        continue;
      }

      // Create user
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,  // Auto-confirm email
        user_metadata: account.userData
      });

      if (error) {
        console.error(`Error creating user ${account.email}:`, error);
        results.push({
          email: account.email,
          status: "error",
          message: error.message
        });
      } else {
        console.log(`Successfully created user ${account.email}`);
        results.push({
          email: account.email,
          status: "created",
          password: account.password
        });
      }
    }

    return new Response(JSON.stringify({ success: true, accounts: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-test-accounts function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
