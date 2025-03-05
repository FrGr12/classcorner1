
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
    // Get environment variables
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

    // Create Supabase admin client
    console.log("Creating Supabase admin client with URL:", supabaseUrl);
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
    
    // Test accounts data
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

    // Process each test account
    for (const account of testAccounts) {
      try {
        console.log(`Processing account: ${account.email}`);
        
        // Try to delete the user first if it exists
        // This ensures we start with a clean slate
        try {
          console.log(`Looking for existing user with email: ${account.email}`);
          const { data: existingUser, error: findError } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', account.email.toLowerCase())
            .single();
            
          if (findError) {
            console.log(`Error finding user in profiles: ${findError.message}`);
          } else if (existingUser) {
            console.log(`Found existing user in profiles with ID: ${existingUser.id}`);
            
            // Delete from auth.users if exists
            const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
              existingUser.id
            );
            
            if (deleteError) {
              console.log(`Error deleting existing user: ${deleteError.message}`);
            } else {
              console.log(`Successfully deleted existing user: ${account.email}`);
            }
          }
        } catch (e) {
          console.error(`Error during user cleanup: ${e.message || e}`);
        }
        
        // Create the user fresh
        console.log(`Creating new user: ${account.email}`);
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: account.email.toLowerCase(),
          password: account.password,
          email_confirm: true,
          user_metadata: account.userData
        });

        if (error) {
          console.error(`Error creating user ${account.email}:`, error);
          results.push({
            email: account.email,
            status: "error",
            message: `Error creating user: ${error.message}`,
            password: account.password
          });
        } else {
          console.log(`Successfully created user ${account.email} with ID: ${data.user.id}`);
          
          // Double-check the user was created
          const { data: checkData, error: checkError } = await supabaseAdmin.auth.admin.getUserById(data.user.id);
          
          if (checkError) {
            console.error(`Error verifying user creation: ${checkError.message}`);
          } else {
            console.log(`Verified user exists with email: ${checkData.user.email}`);
          }
          
          results.push({
            email: account.email,
            status: "created",
            password: account.password,
            userId: data.user.id
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
