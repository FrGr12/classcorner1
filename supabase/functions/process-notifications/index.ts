import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const resendApiKey = Deno.env.get('RESEND_API_KEY')

const supabase = createClient(supabaseUrl!, supabaseServiceKey!)
const resend = new Resend(resendApiKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get upcoming bookings that need reminders
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        *,
        course:courses(title),
        student:profiles!bookings_student_id_fkey(email, first_name),
        session:course_sessions(start_time)
      `)
      .eq('status', 'confirmed')
      .gt('session.start_time', new Date().toISOString())
      .lt('session.start_time', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())

    if (bookingsError) throw bookingsError

    // Get notification settings for students
    const studentIds = bookings?.map(booking => booking.student_id) || []
    const { data: notificationSettings, error: settingsError } = await supabase
      .from('notification_settings')
      .select('*')
      .in('user_id', studentIds)

    if (settingsError) throw settingsError

    // Process each booking
    for (const booking of bookings || []) {
      const settings = notificationSettings?.find(s => s.user_id === booking.student_id)
      if (!settings?.email_reminders) continue

      const studentEmail = booking.student.email
      const studentName = booking.student.first_name
      const classTitle = booking.course.title
      const classTime = new Date(booking.session.start_time)

      // Send email reminder
      try {
        const emailResponse = await resend.emails.send({
          from: 'ClassCorner <notifications@classcorner.app>',
          to: studentEmail,
          subject: `Reminder: Your ${classTitle} class is tomorrow`,
          html: `
            <h1>Class Reminder</h1>
            <p>Hi ${studentName},</p>
            <p>This is a reminder that your ${classTitle} class is scheduled for tomorrow at ${classTime.toLocaleTimeString()}.</p>
            <p>We're looking forward to seeing you!</p>
          `
        })

        // Log the notification
        await supabase.from('notification_logs').insert({
          user_id: booking.student_id,
          booking_id: booking.id,
          notification_type: 'email_reminder',
          status: 'sent',
          content: `Reminder sent for ${classTitle}`
        })

        console.log(`Reminder sent to ${studentEmail} for booking ${booking.id}`)
      } catch (error) {
        console.error(`Failed to send reminder for booking ${booking.id}:`, error)
        
        // Log the error
        await supabase.from('notification_logs').insert({
          user_id: booking.student_id,
          booking_id: booking.id,
          notification_type: 'email_reminder',
          status: 'failed',
          error: error.message
        })
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing notifications:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})