
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherInbox from "@/components/teach/crm/TeacherInbox";
import CreateClass from "@/pages/CreateClass";
import TeacherProfile from "@/pages/TeacherProfile";
import TeacherContacts from "@/pages/TeacherContacts";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherStats from "@/components/teach/dashboard/TeacherStats";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherWaitlist from "@/pages/TeacherWaitlist";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="/overview" element={<TeacherOverview />} />
          <Route path="/create-class" element={<CreateClass />} />
          <Route path="/inbox" element={<TeacherInbox />} />
          <Route path="/contacts" element={<TeacherContacts />} />
          <Route path="/profile" element={<TeacherProfile />} />
          <Route path="/classes" element={<TeacherClasses />} />
          <Route path="/stats" element={<TeacherStats />} />
          <Route path="/reviews" element={<TeacherReviews />} />
          <Route path="/waitlist" element={<TeacherWaitlist />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
