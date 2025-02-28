
import { useState } from "react";
import { TeacherCredits } from "@/components/teach/dashboard/profile/TeacherCredits";
import UserProfile from "@/components/user-dashboard/UserProfile";
import TeacherProfileEdit from "@/components/teach/dashboard/profile/TeacherProfileEdit";

const TeacherProfile = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'edit'>('overview');

  return (
    <div className="w-full space-y-4 sm:space-y-8 -mx-4 sm:mx-0 px-2 sm:px-0">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'overview'
              ? 'bg-accent-purple text-white'
              : 'bg-transparent hover:bg-accent/30'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'edit'
              ? 'bg-accent-purple text-white'
              : 'bg-transparent hover:bg-accent/30'
          }`}
        >
          Edit Profile
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          <UserProfile />
          <TeacherCredits />
        </>
      ) : (
        <TeacherProfileEdit />
      )}
    </div>
  );
};

export default TeacherProfile;
