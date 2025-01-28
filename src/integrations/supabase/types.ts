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
          booking_type: string | null
          course_id: number | null
          created_at: string
          group_size: number | null
          id: number
          payment_status: string | null
          session_id: number | null
          special_requests: string | null
          status: string | null
          student_id: string | null
          total_price: number | null
          updated_at: string
        }
        Insert: {
          booking_type?: string | null
          course_id?: number | null
          created_at?: string
          group_size?: number | null
          id?: number
          payment_status?: string | null
          session_id?: number | null
          special_requests?: string | null
          status?: string | null
          student_id?: string | null
          total_price?: number | null
          updated_at?: string
        }
        Update: {
          booking_type?: string | null
          course_id?: number | null
          created_at?: string
          group_size?: number | null
          id?: number
          payment_status?: string | null
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
            foreignKeyName: "bookings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "course_sessions"
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
      communications: {
        Row: {
          course_id: number | null
          id: number
          instructor_id: string
          message_content: string
          message_type: string
          read_at: string | null
          sent_at: string
          status: string | null
          student_id: string
        }
        Insert: {
          course_id?: number | null
          id?: number
          instructor_id: string
          message_content: string
          message_type: string
          read_at?: string | null
          sent_at?: string
          status?: string | null
          student_id: string
        }
        Update: {
          course_id?: number | null
          id?: number
          instructor_id?: string
          message_content?: string
          message_type?: string
          read_at?: string | null
          sent_at?: string
          status?: string | null
          student_id?: string
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
            foreignKeyName: "communications_instructor_id_fkey_profiles"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
        ]
      }
      course_matches: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          match_score: number | null
          notified_at: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          match_score?: number | null
          notified_at?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          match_score?: number | null
          notified_at?: string | null
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
            foreignKeyName: "course_matches_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
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
        ]
      }
      courses: {
        Row: {
          base_price_group: number | null
          base_price_private: number | null
          category: string
          created_at: string
          description: string
          group_bookings_enabled: boolean | null
          id: number
          instructor_id: string
          learning_objectives: string | null
          location: string
          materials_included: string | null
          max_group_size: number | null
          max_participants: number | null
          max_waitlist_size: number | null
          min_group_size: number | null
          payment_timing: string | null
          price: number
          private_bookings_enabled: boolean | null
          setup_instructions: string | null
          status: Database["public"]["Enums"]["course_status"] | null
          tags: string[] | null
          title: string
          updated_at: string
          waitlist_enabled: boolean | null
        }
        Insert: {
          base_price_group?: number | null
          base_price_private?: number | null
          category: string
          created_at?: string
          description: string
          group_bookings_enabled?: boolean | null
          id?: number
          instructor_id: string
          learning_objectives?: string | null
          location: string
          materials_included?: string | null
          max_group_size?: number | null
          max_participants?: number | null
          max_waitlist_size?: number | null
          min_group_size?: number | null
          payment_timing?: string | null
          price: number
          private_bookings_enabled?: boolean | null
          setup_instructions?: string | null
          status?: Database["public"]["Enums"]["course_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string
          waitlist_enabled?: boolean | null
        }
        Update: {
          base_price_group?: number | null
          base_price_private?: number | null
          category?: string
          created_at?: string
          description?: string
          group_bookings_enabled?: boolean | null
          id?: number
          instructor_id?: string
          learning_objectives?: string | null
          location?: string
          materials_included?: string | null
          max_group_size?: number | null
          max_participants?: number | null
          max_waitlist_size?: number | null
          min_group_size?: number | null
          payment_timing?: string | null
          price?: number
          private_bookings_enabled?: boolean | null
          setup_instructions?: string | null
          status?: Database["public"]["Enums"]["course_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          waitlist_enabled?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
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
          notification_sent_at: string | null
          session_id: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          notification_sent_at?: string | null
          session_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          notification_sent_at?: string | null
          session_id?: number | null
          status?: string | null
          user_id?: string | null
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
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_categories: {
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
