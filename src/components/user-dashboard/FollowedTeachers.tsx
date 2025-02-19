
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserMinus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TeacherInfo {
  id: string;
  first_name: string;
  last_name: string;
  expertise: string[];
}

const FollowedTeachers = () => {
  const [teachers, setTeachers] = useState<TeacherInfo[]>([]);
  const { toast } = useToast();

  const fetchFollowedTeachers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('teacher_follows')
        .select(`
          profiles:teacher_id (
            id,
            first_name,
            last_name,
            expertise
          )
        `)
        .eq('student_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      
      // Extract the profiles data and filter out any null values
      const teacherData = data
        .map(item => item.profiles)
        .filter((profile): profile is TeacherInfo => profile !== null);
      
      setTeachers(teacherData);
    } catch (error) {
      console.error('Error fetching followed teachers:', error);
    }
  };

  const unfollowTeacher = async (teacherId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('teacher_follows')
        .delete()
        .eq('student_id', user.id)
        .eq('teacher_id', teacherId);

      setTeachers(teachers.filter(t => t.id !== teacherId));
      toast({
        title: "Unfollowed",
        description: "You will no longer receive notifications about new classes from this teacher",
      });
    } catch (error) {
      console.error('Error unfollowing teacher:', error);
      toast({
        title: "Error",
        description: "Failed to unfollow teacher",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFollowedTeachers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followed Teachers</CardTitle>
      </CardHeader>
      <CardContent>
        {teachers.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            You haven't followed any teachers yet
          </p>
        ) : (
          <div className="space-y-4">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div>
                  <h3 className="font-medium">
                    {teacher.first_name} {teacher.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {teacher.expertise?.join(", ") || "General instructor"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => unfollowTeacher(teacher.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowedTeachers;
