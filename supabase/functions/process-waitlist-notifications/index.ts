import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get waitlist entries that need notification
    const { data: entries, error: fetchError } = await supabaseClient
      .from('waitlist_entries')
      .select(`
        *,
        course:courses(title),
        profile:profiles(first_name, last_name)
      `)
      .eq('notification_status', 'pending')
      .eq('status', 'waiting')

    if (fetchError) throw fetchError

    for (const entry of entries || []) {
      // Check if there's space in the course
      const { data: bookings, error: bookingsError } = await supabaseClient
        .from('bookings')
        .select('*')
        .eq('course_id', entry.course_id)
        .eq('status', 'confirmed')

      if (bookingsError) {
        console.error('Error checking bookings:', bookingsError)
        continue
      }

      const { data: course, error: courseError } = await supabaseClient
        .from('courses')
        .select('max_participants')
        .eq('id', entry.course_id)
        .single()

      if (courseError) {
        console.error('Error fetching course:', courseError)
        continue
      }

      if (bookings.length < course.max_participants) {
        // Update notification status
        const { error: updateError } = await supabaseClient
          .from('waitlist_entries')
          .update({
            notification_status: 'sent',
            notification_sent_count: entry.notification_sent_count + 1,
            last_notification_sent_at: new Date().toISOString()
          })
          .eq('id', entry.id)

        if (updateError) {
          console.error('Error updating notification status:', updateError)
          continue
        }

        // Send notification via communications table
        const { error: commError } = await supabaseClient
          .from('communications')
          .insert({
            student_id: entry.user_id,
            course_id: entry.course_id,
            message_type: 'waitlist_notification',
            message_content: `A spot has opened up in ${entry.course.title}! Please book within 24 hours to secure your place.`
          })

        if (commError) {
          console.error('Error sending notification:', commError)
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing waitlist notifications:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})