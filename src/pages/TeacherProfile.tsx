
import { TeacherCredits } from "@/components/teach/dashboard/profile/TeacherCredits";
import UserProfile from "@/components/user-dashboard/UserProfile";

const TeacherProfile = () => {
  return (
    <div className="space-y-8">
      <TeacherCredits />
      <UserProfile />
    </div>
  );
};

export default TeacherProfile;
