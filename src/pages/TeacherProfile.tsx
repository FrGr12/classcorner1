
import { TeacherCredits } from "@/components/teach/dashboard/profile/TeacherCredits";
import UserProfile from "@/components/user-dashboard/UserProfile";

const TeacherProfile = () => {
  return (
    <div className="w-full space-y-8">
      <UserProfile />
      <TeacherCredits />
    </div>
  );
};

export default TeacherProfile;
