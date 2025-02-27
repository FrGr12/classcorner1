
import { TeacherCredits } from "@/components/teach/dashboard/profile/TeacherCredits";
import UserProfile from "@/components/user-dashboard/UserProfile";

const TeacherProfile = () => {
  return (
    <div className="w-full space-y-4 sm:space-y-8 -mx-4 sm:mx-0 px-2 sm:px-0">
      <UserProfile />
      <TeacherCredits />
    </div>
  );
};

export default TeacherProfile;
