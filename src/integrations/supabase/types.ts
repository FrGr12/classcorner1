export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          attendance_status: string | null
          booking_source: string | null
          booking_type: string | null
          cancellation_date: string | null
          cancellation_reason: string | null
          course_id: number | null
          created_at: string
          feedback_submitted: boolean | null
          group_size: number | null
          id: number
          original_session_id: number | null
          payment_status: string | null
          payout_status: string | null
          rescheduled_at: string | null
          session_id: number | null
          special_requests: string | null
          status: string | null
          student_id: string | null
          total_price: number | null
          updated_at: string
        }
        Insert: {
          attendance_status?: string | null
          booking_source?: string | null
          booking_type?: string | null
          cancellation_date?: string | null
          cancellation_reason?: string | null
          course_id?: number | null
          created_at?: string
          feedback_submitted?: boolean | null
          group_size?: number | null
          id?: number
          original_session_id?: number | null
          payment_status?: string | null
          payout_status?: string | null
          rescheduled_at?: string | null
          session_id?: number | null
          special_requests?: string | null
          status?: string | null
          student_id?: string | null
          total_price?: number | null
          updated_at?: string
        }
        Update: {
          attendance_status?: string | null
          booking_source?: string | null
          booking_type?: string | null
          cancellation_date?: string | null
          cancellation_reason?: string | null
          course_id?: number | null
          created_at?: string
          feedback_submitted?: boolean | null
          group_size?: number | null
          id?: number
          original_session_id?: number | null
          payment_status?: string | null
          payout_status?: string | null
          rescheduled_at?: string | null
          session_id?: number | null
          special_requests?: string | null
          status?: string | null
          student_id?: string | null
          total_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "bookings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "bookings_original_session_id_fkey"
            columns: ["original_session_id"]
            isOneToOne: false
            referencedRelation: "course_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "course_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      boost_analytics: {
        Row: {
          bookings_before: number | null
          bookings_during: number | null
          boost_id: number | null
          created_at: string | null
          id: number
          inquiries_before: number | null
          inquiries_during: number | null
          revenue_before: number | null
          revenue_during: number | null
          updated_at: string | null
          views_before: number | null
          views_during: number | null
        }
        Insert: {
          bookings_before?: number | null
          bookings_during?: number | null
          boost_id?: number | null
          created_at?: string | null
          id?: never
          inquiries_before?: number | null
          inquiries_during?: number | null
          revenue_before?: number | null
          revenue_during?: number | null
          updated_at?: string | null
          views_before?: number | null
          views_during?: number | null
        }
        Update: {
          bookings_before?: number | null
          bookings_during?: number | null
          boost_id?: number | null
          created_at?: string | null
          id?: never
          inquiries_before?: number | null
          inquiries_during?: number | null
          revenue_before?: number | null
          revenue_during?: number | null
          updated_at?: string | null
          views_before?: number | null
          views_during?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "boost_analytics_boost_id_fkey"
            columns: ["boost_id"]
            isOneToOne: false
            referencedRelation: "course_boosts"
            referencedColumns: ["id"]
          },
        ]
      }
      boost_credit_purchases: {
        Row: {
          amount: number
          created_at: string | null
          credits_added: boolean | null
          id: number
          payment_intent_id: string | null
          payment_status: string | null
          price: number
          teacher_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          credits_added?: boolean | null
          id?: never
          payment_intent_id?: string | null
          payment_status?: string | null
          price: number
          teacher_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          credits_added?: boolean | null
          id?: never
          payment_intent_id?: string | null
          payment_status?: string | null
          price?: number
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boost_credit_purchases_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_message_campaigns: {
        Row: {
          created_at: string
          id: string
          instructor_id: string
          message_content: string
          recipient_filter: Json | null
          scheduled_for: string | null
          sent_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instructor_id: string
          message_content: string
          recipient_filter?: Json | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instructor_id?: string
          message_content?: string
          recipient_filter?: Json | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bulk_message_recipients: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          read_at: string | null
          sent_at: string | null
          status: string
          student_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          student_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bulk_message_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "bulk_message_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_message_recipients_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      category_criteria: {
        Row: {
          category: Database["public"]["Enums"]["cross_functional_category"]
          created_at: string | null
          created_by: string | null
          id: number
          keyword: string | null
          threshold_value: number | null
          time_window: unknown | null
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["cross_functional_category"]
          created_at?: string | null
          created_by?: string | null
          id?: number
          keyword?: string | null
          threshold_value?: number | null
          time_window?: unknown | null
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["cross_functional_category"]
          created_at?: string | null
          created_by?: string | null
          id?: number
          keyword?: string | null
          threshold_value?: number | null
          time_window?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      class_promotions: {
        Row: {
          amount_paid: number
          course_id: number | null
          created_at: string | null
          end_date: string
          id: number
          promotion_type: string
          start_date: string
          status: string
        }
        Insert: {
          amount_paid: number
          course_id?: number | null
          created_at?: string | null
          end_date: string
          id?: number
          promotion_type: string
          start_date: string
          status?: string
        }
        Update: {
          amount_paid?: number
          course_id?: number | null
          created_at?: string | null
          end_date?: string
          id?: number
          promotion_type?: string
          start_date?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_promotions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_promotions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "class_promotions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      communications: {
        Row: {
          assigned_to: string | null
          communication_context: string | null
          course_id: number | null
          id: number
          instructor_id: string
          is_unread: boolean | null
          last_activity_at: string | null
          message_content: string
          message_type: string
          read_at: string | null
          related_booking_id: number | null
          response_time: unknown | null
          sent_at: string
          status: string | null
          student_id: string
          template_used: boolean | null
          thread_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          communication_context?: string | null
          course_id?: number | null
          id?: number
          instructor_id: string
          is_unread?: boolean | null
          last_activity_at?: string | null
          message_content: string
          message_type: string
          read_at?: string | null
          related_booking_id?: number | null
          response_time?: unknown | null
          sent_at?: string
          status?: string | null
          student_id: string
          template_used?: boolean | null
          thread_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          communication_context?: string | null
          course_id?: number | null
          id?: number
          instructor_id?: string
          is_unread?: boolean | null
          last_activity_at?: string | null
          message_content?: string
          message_type?: string
          read_at?: string | null
          related_booking_id?: number | null
          response_time?: unknown | null
          sent_at?: string
          status?: string | null
          student_id?: string
          template_used?: boolean | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "communications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "communications_instructor_id_fkey_profiles"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_related_booking_id_fkey"
            columns: ["related_booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_student_id_fkey_profiles"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_notes: {
        Row: {
          contact_id: string | null
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          contact_id?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          contact_id?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_notes_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_tag_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          contact_id: string | null
          id: string
          tag_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          contact_id?: string | null
          id?: string
          tag_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          contact_id?: string | null
          id?: string
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_tag_assignments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_tag_assignments_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "contact_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_tags: {
        Row: {
          color: string | null
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          status_color: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          status_color?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          status_color?: string | null
        }
        Relationships: []
      }
      course_activity_log: {
        Row: {
          activity_type: string
          course_id: number | null
          created_at: string | null
          id: number
          metadata: Json | null
          student_id: string | null
        }
        Insert: {
          activity_type: string
          course_id?: number | null
          created_at?: string | null
          id?: number
          metadata?: Json | null
          student_id?: string | null
        }
        Update: {
          activity_type?: string
          course_id?: number | null
          created_at?: string | null
          id?: number
          metadata?: Json | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_activity_log_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_activity_log_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_activity_log_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_boosts: {
        Row: {
          boost_type: string | null
          course_id: number | null
          created_at: string | null
          end_time: string | null
          id: number
          start_time: string | null
          status: string | null
        }
        Insert: {
          boost_type?: string | null
          course_id?: number | null
          created_at?: string | null
          end_time?: string | null
          id?: number
          start_time?: string | null
          status?: string | null
        }
        Update: {
          boost_type?: string | null
          course_id?: number | null
          created_at?: string | null
          end_time?: string | null
          id?: number
          start_time?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_boosts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_boosts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_boosts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_browsing_history: {
        Row: {
          course_id: number | null
          id: number
          last_viewed_section: string | null
          user_id: string | null
          view_duration: number | null
          viewed_at: string
        }
        Insert: {
          course_id?: number | null
          id?: never
          last_viewed_section?: string | null
          user_id?: string | null
          view_duration?: number | null
          viewed_at?: string
        }
        Update: {
          course_id?: number | null
          id?: never
          last_viewed_section?: string | null
          user_id?: string | null
          view_duration?: number | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_browsing_history_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_browsing_history_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_browsing_history_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_category_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          category: Database["public"]["Enums"]["cross_functional_category"]
          course_id: number | null
          expires_at: string | null
          id: number
          is_manual: boolean | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          category: Database["public"]["Enums"]["cross_functional_category"]
          course_id?: number | null
          expires_at?: string | null
          id?: number
          is_manual?: boolean | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          category?: Database["public"]["Enums"]["cross_functional_category"]
          course_id?: number | null
          expires_at?: string | null
          id?: number
          is_manual?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "course_category_assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_category_assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_category_assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_discounts: {
        Row: {
          code: string | null
          course_id: number | null
          created_at: string
          current_uses: number | null
          discount_type: string | null
          discount_value: number | null
          end_date: string | null
          id: number
          max_uses: number | null
          start_date: string | null
        }
        Insert: {
          code?: string | null
          course_id?: number | null
          created_at?: string
          current_uses?: number | null
          discount_type?: string | null
          discount_value?: number | null
          end_date?: string | null
          id?: number
          max_uses?: number | null
          start_date?: string | null
        }
        Update: {
          code?: string | null
          course_id?: number | null
          created_at?: string
          current_uses?: number | null
          discount_type?: string | null
          discount_value?: number | null
          end_date?: string | null
          id?: number
          max_uses?: number | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_discounts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discounts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_discounts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_images: {
        Row: {
          course_id: number | null
          created_at: string
          display_order: number
          id: number
          image_path: string
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          display_order: number
          id?: number
          image_path: string
        }
        Update: {
          course_id?: number | null
          created_at?: string
          display_order?: number
          id?: number
          image_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_images_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_images_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_images_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_matches: {
        Row: {
          booking_history_score: number | null
          course_id: number | null
          created_at: string
          id: number
          interest_score: number | null
          location_score: number | null
          match_score: number | null
          notified_at: string | null
          trending_score: number | null
          user_id: string | null
        }
        Insert: {
          booking_history_score?: number | null
          course_id?: number | null
          created_at?: string
          id?: number
          interest_score?: number | null
          location_score?: number | null
          match_score?: number | null
          notified_at?: string | null
          trending_score?: number | null
          user_id?: string | null
        }
        Update: {
          booking_history_score?: number | null
          course_id?: number | null
          created_at?: string
          id?: number
          interest_score?: number | null
          location_score?: number | null
          match_score?: number | null
          notified_at?: string | null
          trending_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_matches_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_matches_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_matches_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_matches_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_promotional_stats: {
        Row: {
          ad_clicks: number | null
          course_id: number | null
          created_at: string | null
          id: number
          saves: number | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          ad_clicks?: number | null
          course_id?: number | null
          created_at?: string | null
          id?: never
          saves?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          ad_clicks?: number | null
          course_id?: number | null
          created_at?: string | null
          id?: never
          saves?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_promotional_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_promotional_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_promotional_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          instructor_response: string | null
          rating: number | null
          review_text: string | null
          reviewer_id: string | null
          updated_at: string
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          instructor_response?: string | null
          rating?: number | null
          review_text?: string | null
          reviewer_id?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          instructor_response?: string | null
          rating?: number | null
          review_text?: string | null
          reviewer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_sessions: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          is_recurring: boolean | null
          recurrence_count: number | null
          recurrence_end_date: string | null
          recurrence_pattern: string | null
          start_time: string
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          is_recurring?: boolean | null
          recurrence_count?: number | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          start_time: string
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          is_recurring?: boolean | null
          recurrence_count?: number | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      courses: {
        Row: {
          auto_promote_from_waitlist: boolean | null
          auto_send_waitlist_notification: boolean | null
          base_price_group: number | null
          base_price_private: number | null
          category: string
          created_at: string
          description: string
          duration: string | null
          group_bookings_enabled: boolean | null
          id: number
          instructor_id: string | null
          last_shared_at: string | null
          learning_objectives: string | null
          learning_outcomes: string[] | null
          location: string
          materials_included: string | null
          max_group_size: number | null
          max_participants: number | null
          max_waitlist_size: number | null
          min_group_size: number | null
          payment_timing: string | null
          price: number
          private_bookings_enabled: boolean | null
          search_vector: unknown | null
          setup_instructions: string | null
          share_count: number | null
          status: Database["public"]["Enums"]["course_status"] | null
          tags: string[] | null
          title: string
          updated_at: string
          waitlist_enabled: boolean | null
          what_to_bring: string[] | null
        }
        Insert: {
          auto_promote_from_waitlist?: boolean | null
          auto_send_waitlist_notification?: boolean | null
          base_price_group?: number | null
          base_price_private?: number | null
          category: string
          created_at?: string
          description: string
          duration?: string | null
          group_bookings_enabled?: boolean | null
          id?: number
          instructor_id?: string | null
          last_shared_at?: string | null
          learning_objectives?: string | null
          learning_outcomes?: string[] | null
          location: string
          materials_included?: string | null
          max_group_size?: number | null
          max_participants?: number | null
          max_waitlist_size?: number | null
          min_group_size?: number | null
          payment_timing?: string | null
          price: number
          private_bookings_enabled?: boolean | null
          search_vector?: unknown | null
          setup_instructions?: string | null
          share_count?: number | null
          status?: Database["public"]["Enums"]["course_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string
          waitlist_enabled?: boolean | null
          what_to_bring?: string[] | null
        }
        Update: {
          auto_promote_from_waitlist?: boolean | null
          auto_send_waitlist_notification?: boolean | null
          base_price_group?: number | null
          base_price_private?: number | null
          category?: string
          created_at?: string
          description?: string
          duration?: string | null
          group_bookings_enabled?: boolean | null
          id?: number
          instructor_id?: string | null
          last_shared_at?: string | null
          learning_objectives?: string | null
          learning_outcomes?: string[] | null
          location?: string
          materials_included?: string | null
          max_group_size?: number | null
          max_participants?: number | null
          max_waitlist_size?: number | null
          min_group_size?: number | null
          payment_timing?: string | null
          price?: number
          private_bookings_enabled?: boolean | null
          search_vector?: unknown | null
          setup_instructions?: string | null
          share_count?: number | null
          status?: Database["public"]["Enums"]["course_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          waitlist_enabled?: boolean | null
          what_to_bring?: string[] | null
        }
        Relationships: []
      }
      follow_up_tasks: {
        Row: {
          assigned_to: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          campaign_type: string
          content: string | null
          course_id: number | null
          created_at: string
          generated_assets: Json | null
          id: number
          instructor_id: string
          performance_metrics: Json | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
        }
        Insert: {
          campaign_type: string
          content?: string | null
          course_id?: number | null
          created_at?: string
          generated_assets?: Json | null
          id?: number
          instructor_id: string
          performance_metrics?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          status: string
        }
        Update: {
          campaign_type?: string
          content?: string | null
          course_id?: number | null
          created_at?: string
          generated_assets?: Json | null
          id?: number
          instructor_id?: string
          performance_metrics?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_campaigns_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_campaigns_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "marketing_campaigns_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      message_templates: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          booking_id: number | null
          content: string | null
          error: string | null
          id: number
          notification_type: string
          sent_at: string
          status: string
          user_id: string
        }
        Insert: {
          booking_id?: number | null
          content?: string | null
          error?: string | null
          id?: number
          notification_type: string
          sent_at?: string
          status: string
          user_id: string
        }
        Update: {
          booking_id?: number | null
          content?: string | null
          error?: string | null
          id?: number
          notification_type?: string
          sent_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          created_at: string
          email_reminders: boolean | null
          id: number
          phone_number: string | null
          reminder_hours: number[] | null
          sms_reminders: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_reminders?: boolean | null
          id?: number
          phone_number?: string | null
          reminder_hours?: number[] | null
          sms_reminders?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_reminders?: boolean | null
          id?: number
          phone_number?: string | null
          reminder_hours?: number[] | null
          sms_reminders?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_steps: {
        Row: {
          created_at: string | null
          id: string
          interests_completed: boolean | null
          location_completed: boolean | null
          preferences_completed: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interests_completed?: boolean | null
          location_completed?: boolean | null
          preferences_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interests_completed?: boolean | null
          location_completed?: boolean | null
          preferences_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_steps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          booking_id: number | null
          created_at: string
          currency: string
          id: number
          payment_status: string
          receipt_url: string | null
          stripe_client_secret: string | null
          stripe_payment_intent_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          booking_id?: number | null
          created_at?: string
          currency?: string
          id?: never
          payment_status?: string
          receipt_url?: string | null
          stripe_client_secret?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_id?: number | null
          created_at?: string
          currency?: string
          id?: never
          payment_status?: string
          receipt_url?: string | null
          stripe_client_secret?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string | null
          avatar_url: string | null
          bio: string | null
          class_reminders: boolean | null
          contact_frequency: string | null
          created_at: string
          email: string | null
          email_notifications: boolean | null
          expertise: string[] | null
          first_name: string | null
          hourly_rate: number | null
          id: string
          interests: string[] | null
          languages: string[] | null
          last_contacted: string | null
          last_name: string | null
          location: string | null
          marketing_emails: boolean | null
          notes: string | null
          onboarding_completed: boolean | null
          phone: string | null
          portfolio_url: string | null
          preferred_contact_method: string | null
          preferred_teaching_method: string | null
          search_text: string | null
          sms_notifications: boolean | null
          social_media: Json | null
          tags: string[] | null
          teaching_experience: string | null
          timezone: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
          username: string | null
        }
        Insert: {
          account_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          class_reminders?: boolean | null
          contact_frequency?: string | null
          created_at?: string
          email?: string | null
          email_notifications?: boolean | null
          expertise?: string[] | null
          first_name?: string | null
          hourly_rate?: number | null
          id: string
          interests?: string[] | null
          languages?: string[] | null
          last_contacted?: string | null
          last_name?: string | null
          location?: string | null
          marketing_emails?: boolean | null
          notes?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          portfolio_url?: string | null
          preferred_contact_method?: string | null
          preferred_teaching_method?: string | null
          search_text?: string | null
          sms_notifications?: boolean | null
          social_media?: Json | null
          tags?: string[] | null
          teaching_experience?: string | null
          timezone?: string | null
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
          username?: string | null
        }
        Update: {
          account_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          class_reminders?: boolean | null
          contact_frequency?: string | null
          created_at?: string
          email?: string | null
          email_notifications?: boolean | null
          expertise?: string[] | null
          first_name?: string | null
          hourly_rate?: number | null
          id?: string
          interests?: string[] | null
          languages?: string[] | null
          last_contacted?: string | null
          last_name?: string | null
          location?: string | null
          marketing_emails?: boolean | null
          notes?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          portfolio_url?: string | null
          preferred_contact_method?: string | null
          preferred_teaching_method?: string | null
          search_text?: string | null
          sms_notifications?: boolean | null
          social_media?: Json | null
          tags?: string[] | null
          teaching_experience?: string | null
          timezone?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          username?: string | null
        }
        Relationships: []
      }
      student_metrics: {
        Row: {
          average_rating: number | null
          created_at: string | null
          id: string
          student_id: string | null
          total_classes_attended: number | null
          total_spent: number | null
          upcoming_classes: number | null
          updated_at: string | null
        }
        Insert: {
          average_rating?: number | null
          created_at?: string | null
          id?: string
          student_id?: string | null
          total_classes_attended?: number | null
          total_spent?: number | null
          upcoming_classes?: number | null
          updated_at?: string | null
        }
        Update: {
          average_rating?: number | null
          created_at?: string | null
          id?: string
          student_id?: string | null
          total_classes_attended?: number | null
          total_spent?: number | null
          upcoming_classes?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      teacher_course_stats: {
        Row: {
          active_students: number | null
          avg_rating: number | null
          completed_students: number | null
          course_id: number | null
          created_at: string | null
          id: number
          revenue: number | null
          teacher_id: string | null
          total_students: number | null
          updated_at: string | null
        }
        Insert: {
          active_students?: number | null
          avg_rating?: number | null
          completed_students?: number | null
          course_id?: number | null
          created_at?: string | null
          id?: number
          revenue?: number | null
          teacher_id?: string | null
          total_students?: number | null
          updated_at?: string | null
        }
        Update: {
          active_students?: number | null
          avg_rating?: number | null
          completed_students?: number | null
          course_id?: number | null
          created_at?: string | null
          id?: number
          revenue?: number | null
          teacher_id?: string | null
          total_students?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_course_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_course_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "teacher_course_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      teacher_dashboard_activity: {
        Row: {
          action_details: Json | null
          action_type: string
          created_at: string
          id: number
          related_booking_id: number | null
          related_course_id: number | null
          teacher_id: string
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          created_at?: string
          id?: number
          related_booking_id?: number | null
          related_course_id?: number | null
          teacher_id: string
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          created_at?: string
          id?: number
          related_booking_id?: number | null
          related_course_id?: number | null
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_dashboard_activity_related_booking_id_fkey"
            columns: ["related_booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_dashboard_activity_related_course_id_fkey"
            columns: ["related_course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_dashboard_activity_related_course_id_fkey"
            columns: ["related_course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "teacher_dashboard_activity_related_course_id_fkey"
            columns: ["related_course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      teacher_metrics: {
        Row: {
          avg_rating: number | null
          created_at: string | null
          id: string
          instructor_id: string | null
          total_revenue: number | null
          total_students: number | null
          upcoming_classes: number | null
          updated_at: string | null
        }
        Insert: {
          avg_rating?: number | null
          created_at?: string | null
          id?: string
          instructor_id?: string | null
          total_revenue?: number | null
          total_students?: number | null
          upcoming_classes?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_rating?: number | null
          created_at?: string | null
          id?: string
          instructor_id?: string | null
          total_revenue?: number | null
          total_students?: number | null
          upcoming_classes?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      teacher_premium_features: {
        Row: {
          boost_credits: number | null
          created_at: string | null
          features: Json | null
          id: number
          is_active: boolean | null
          last_boost_reset: string | null
          subscription_end: string | null
          subscription_start: string | null
          subscription_type: string | null
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          boost_credits?: number | null
          created_at?: string | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          last_boost_reset?: string | null
          subscription_end?: string | null
          subscription_start?: string | null
          subscription_type?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          boost_credits?: number | null
          created_at?: string | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          last_boost_reset?: string | null
          subscription_end?: string | null
          subscription_start?: string | null
          subscription_type?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_course_preferences: {
        Row: {
          created_at: string | null
          id: string
          max_price: number | null
          preferred_categories: string[] | null
          preferred_locations: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_price?: number | null
          preferred_categories?: string[] | null
          preferred_locations?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_price?: number | null
          preferred_categories?: string[] | null
          preferred_locations?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_course_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          interests: string[] | null
          max_distance: number | null
          notification_preference:
            | Database["public"]["Enums"]["notification_preference"]
            | null
          preferred_location: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          interests?: string[] | null
          max_distance?: number | null
          notification_preference?:
            | Database["public"]["Enums"]["notification_preference"]
            | null
          preferred_location?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          interests?: string[] | null
          max_distance?: number | null
          notification_preference?:
            | Database["public"]["Enums"]["notification_preference"]
            | null
          preferred_location?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      waitlist_entries: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          last_notification_sent_at: string | null
          notification_expires_at: string | null
          notification_sent_at: string | null
          notification_sent_count: number | null
          notification_status: string | null
          notification_template: string | null
          session_id: number | null
          status: string | null
          user_id: string | null
          waitlist_position: number | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          last_notification_sent_at?: string | null
          notification_expires_at?: string | null
          notification_sent_at?: string | null
          notification_sent_count?: number | null
          notification_status?: string | null
          notification_template?: string | null
          session_id?: number | null
          status?: string | null
          user_id?: string | null
          waitlist_position?: number | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          last_notification_sent_at?: string | null
          notification_expires_at?: string | null
          notification_sent_at?: string | null
          notification_sent_count?: number | null
          notification_status?: string | null
          notification_template?: string | null
          session_id?: number | null
          status?: string | null
          user_id?: string | null
          waitlist_position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "waitlist_entries_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waitlist_entries_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "waitlist_entries_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "waitlist_entries_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waitlist_entries_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "course_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      course_payment_stats: {
        Row: {
          course_id: number | null
          paid_count: number | null
          pending_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_engagement_metrics"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "bookings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "teacher_revenue_insights"
            referencedColumns: ["course_id"]
          },
        ]
      }
      teacher_engagement_metrics: {
        Row: {
          attended_students: number | null
          avg_rating: number | null
          course_id: number | null
          feedback_submitted: number | null
          instructor_id: string | null
          title: string | null
          total_students: number | null
        }
        Relationships: []
      }
      teacher_revenue_insights: {
        Row: {
          avg_revenue_per_booking: number | null
          booking_month: string | null
          course_id: number | null
          instructor_id: string | null
          title: string | null
          total_bookings: number | null
          total_revenue: number | null
          unique_students: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_class_utilization: {
        Args: {
          course_id: number
        }
        Returns: number
      }
      calculate_trending_score: {
        Args: {
          course_id_param: number
        }
        Returns: number
      }
      calculate_user_course_match: {
        Args: {
          user_preferences_record: unknown
          course_record: unknown
        }
        Returns: number
      }
      cleanup_expired_categories: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_activity_logs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      process_match_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_ai_match_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      course_status: "draft" | "published" | "archived"
      cross_functional_category:
        | "recommended"
        | "recently_added"
        | "popular_nearby"
        | "top_rated"
        | "last_minute_deal"
        | "seasonal_special"
        | "beginner_friendly"
        | "advanced_course"
        | "family_friendly"
      notification_preference: "email" | "in_app" | "both" | "none"
      user_type: "student" | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
