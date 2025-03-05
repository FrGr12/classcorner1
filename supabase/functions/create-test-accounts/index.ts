
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
        
        // CRITICAL FIX: First check if the user exists using auth.admin.listUsers 
        // This ensures we're checking the auth.users table directly
        console.log(`Checking if user already exists: ${account.email}`);
        const { data: existingUsers, error: userError } = await supabaseAdmin.auth.admin.listUsers({
          filter: {
            email: account.email.toLowerCase()
          }
        });
        
        if (userError) {
          console.error(`Error checking existing user: ${userError.message}`);
        }
        
        // If user exists, delete it first to start clean
        if (existingUsers?.users?.length > 0) {
          const existingUser = existingUsers.users[0];
          console.log(`Found existing user with ID: ${existingUser.id}`);
          
          // Delete the user using admin.deleteUser
          const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
            existingUser.id
          );
          
          if (deleteError) {
            console.log(`Error deleting existing user: ${deleteError.message}`);
            throw new Error(`Failed to delete existing user: ${deleteError.message}`);
          } else {
            console.log(`Successfully deleted existing user: ${account.email}`);
            
            // Add a small delay to ensure deletion propagates
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } else {
          console.log(`No existing user found with email: ${account.email}`);
        }
        
        // Create the user fresh with admin.createUser
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
          
          // Verify the user was created successfully 
          const { data: getUserData, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(data.user.id);
          
          if (getUserError) {
            console.error(`Error verifying user creation: ${getUserError.message}`);
            results.push({
              email: account.email,
              status: "warning",
              message: `User created but verification failed: ${getUserError.message}`,
              password: account.password,
              userId: data.user.id
            });
          } else {
            console.log(`Verified user exists with email: ${getUserData.user.email}`);
            results.push({
              email: account.email,
              status: "created",
              password: account.password,
              userId: data.user.id
            });
          }
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
