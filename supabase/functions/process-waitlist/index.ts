import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get waitlist entries that need processing
    const { data: entries, error: fetchError } = await supabaseClient
      .from('waitlist_entries')
      .select(`
        *,
        course:courses(
          title,
          max_participants
        ),
        profile:profiles(
          first_name,
          last_name,
          email
        )
      `)
      .eq('status', 'waiting')
      .is('notification_sent_at', null)
      .order('waitlist_position', { ascending: true });

    if (fetchError) throw fetchError;

    for (const entry of entries || []) {
      // Check current booking count
      const { count: currentBookings } = await supabaseClient
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', entry.course_id)
        .eq('status', 'confirmed');

      if (currentBookings < entry.course.max_participants) {
        // Set notification expiry (3 hours from now)
        const notificationExpiry = new Date();
        notificationExpiry.setHours(notificationExpiry.getHours() + 3);

        // Update entry status
        const { error: updateError } = await supabaseClient
          .from('waitlist_entries')
          .update({
            notification_sent_at: new Date().toISOString(),
            notification_expires_at: notificationExpiry.toISOString(),
            notification_status: 'sent'
          })
          .eq('id', entry.id);

        if (updateError) {
          console.error('Error updating waitlist entry:', updateError);
          continue;
        }

        // Send email notification
        if (entry.profile?.email) {
          try {
            await resend.emails.send({
              from: "Lovable <notifications@yourdomain.com>",
              to: [entry.profile.email],
              subject: `A spot is available in ${entry.course.title}!`,
              html: `
                <h1>A spot has opened up!</h1>
                <p>Dear ${entry.profile.first_name},</p>
                <p>A spot has become available in "${entry.course.title}". You have 3 hours to accept this spot before it's offered to the next person on the waitlist.</p>
                <p>Please log in to your account to accept or decline this offer.</p>
                <p>This offer expires at: ${notificationExpiry.toLocaleString()}</p>
              `,
            });
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }

        // Add to communications log
        await supabaseClient
          .from('communications')
          .insert({
            student_id: entry.user_id,
            course_id: entry.course_id,
            message_type: 'waitlist_notification',
            message_content: `A spot has opened up in ${entry.course.title}. You have 3 hours to accept.`,
          });
      }
    }

    // Process expired notifications
    const { error: expiredError } = await supabaseClient
      .from('waitlist_entries')
      .update({
        status: 'expired',
        notification_status: 'expired'
      })
      .eq('status', 'waiting')
      .lt('notification_expires_at', new Date().toISOString());

    if (expiredError) {
      console.error('Error processing expired notifications:', expiredError);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing waitlist:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});