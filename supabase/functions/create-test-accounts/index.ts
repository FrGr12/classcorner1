
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
    // Log environment variables (without revealing full keys)
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    console.log("Environment check:", {
      "SUPABASE_URL": supabaseUrl ? "✓ Set" : "✗ Missing",
      "SUPABASE_SERVICE_ROLE_KEY": supabaseServiceKey ? "✓ Set (hidden)" : "✗ Missing",
    });
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Server configuration error: Missing environment variables" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    console.log("Creating Supabase admin client...");
    
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    console.log("Supabase admin client created successfully");
    console.log("Preparing test accounts...");

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
      try {
        console.log(`Processing account: ${account.email}`);
        
        // Check if user already exists
        console.log(`Checking if user ${account.email} already exists...`);
        const { data: existingUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserByEmail(
          account.email
        );

        if (fetchError) {
          console.error(`Error checking if user ${account.email} exists:`, fetchError);
          results.push({
            email: account.email,
            status: "error",
            message: `Error checking user: ${fetchError.message}`
          });
          continue;
        }

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
        console.log(`Creating user ${account.email}...`);
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
      } catch (accountError) {
        console.error(`Unexpected error processing account ${account.email}:`, accountError);
        results.push({
          email: account.email,
          status: "error",
          message: accountError.message || "Unknown error"
        });
      }
    }

    console.log("All accounts processed. Results:", results);

    return new Response(JSON.stringify({ success: true, accounts: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Fatal error in create-test-accounts function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
