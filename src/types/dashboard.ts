
export interface DashboardMetrics {
  totalClasses: number;
  upcomingBookings: number;
  averageRating: number;
  waitlistCount: number;
}

export interface BookingData {
  courses: {
    id: number;
    title: string;
    price: number;
    location: string;
    instructor_id: string;
    course_images: {
      image_path: string;
    }[];
    profiles: {
      first_name: string;
      last_name: string;
    }[];
  };
  course_sessions: {
    start_time: string;
  }[];
}
