import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!)

    // Enable the pg_cron extension
    await supabase.rpc('extensions', {
      name: 'pg_cron'
    })

    // Create the cron job to run every 5 minutes
    await supabase.rpc('cron.schedule', {
      job_name: 'process_waitlist',
      schedule: '*/5 * * * *',
      command: `
        SELECT
          net.http_post(
            url:='${supabaseUrl}/functions/v1/process-waitlist',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseServiceKey}"}'::jsonb
          ) as request_id;
      `
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error setting up cron job:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})