
export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  languages: string[] | null;
  tags?: string[];
};

export type Message = {
  id: number;
  message_type: string;
  message_content: string;
  sent_at: string;
  read_at: string | null;
  status: string;
  student_id: string;
  course_id: number | null;
  instructor_id: string;
  thread_id: string | null;
  is_unread: boolean;
  assigned_to: string | null;
  communication_context: string | null;
  last_activity_at: string | null;
  profile: Profile | null;
  course: {
    title: string | null;
    price: number | null;
    duration: string | null;
  } | null;
};
