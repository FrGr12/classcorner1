
export interface SavedClassData {
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
}
