
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ClassCard from "@/components/landing/ClassCard";
import LoadingState from "./LoadingState";
import { toast } from "sonner";

interface SavedClass {
  id: number;
  title: string;
  description: string;
  price: number;
  instructor: string;
  rating: number;
  images: string[];
  level: string;
  date: Date;
  city: string;
}

interface CourseData {
  courses: {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    instructor_id: string;
    course_images: { image_path: string }[];
    profiles: {
      first_name: string;
      last_name: string;
    }[];
  };
}

const UserSavedClasses = () => {
  const [savedClasses, setSavedClasses] = useState<SavedClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSavedClasses();
  }, []);

  const fetchSavedClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: savedCourses, error } = await supabase
        .from('course_browsing_history')
        .select(`
          courses (
            id,
            title,
            description,
            price,
            location,
            instructor_id,
            course_images (
              image_path
            ),
            profiles (
              first_name,
              last_name
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('is_saved', true)
        .order('viewed_at', { ascending: false });

      if (error) throw error;

      const formattedClasses = (savedCourses as CourseData[])?.map(item => ({
        id: item.courses.id,
        title: item.courses.title,
        description: item.courses.description,
        price: item.courses.price,
        instructor: `${item.courses.profiles[0]?.first_name || ''} ${item.courses.profiles[0]?.last_name || ''}`,
        rating: 4.5, // Default rating or fetch from reviews
        images: item.courses.course_images.map(img => img.image_path),
        level: "All Levels",
        date: new Date(),
        city: item.courses.location
      })) || [];

      setSavedClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching saved classes:', error);
      toast.error("Failed to load saved classes");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Saved Classes</h2>
        <Heart className="w-5 h-5 text-neutral-400" />
      </div>
      <div className="space-y-4">
        {savedClasses.length > 0 ? (
          savedClasses.map((classItem) => (
            <ClassCard key={classItem.id} {...classItem} />
          ))
        ) : (
          <p className="text-sm text-neutral-600">No saved classes yet</p>
        )}
      </div>
    </Card>
  );
};

export default UserSavedClasses;
