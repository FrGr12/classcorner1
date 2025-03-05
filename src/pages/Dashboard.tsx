
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherInbox from "@/components/teach/crm/TeacherInbox";
import CreateClass from "@/pages/CreateClass";
import TeacherProfile from "@/pages/TeacherProfile";
import TeacherContacts from "@/pages/TeacherContacts";
import ContactManagement from "@/pages/ContactManagement";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherStats from "@/components/teach/dashboard/TeacherStats";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherWaitlist from "@/pages/TeacherWaitlist";
import { Breadcrumbs, useBreadcrumbs } from "@/components/navigation/Breadcrumbs";
import AuthGuard from "@/components/auth/AuthGuard";

const Dashboard = () => {
  const breadcrumbs = useBreadcrumbs();
  
  return (
    <AuthGuard allowBypass={true}>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <DashboardHeader />
        <main className="flex-1 p-2 sm:p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={breadcrumbs} showHome={false} />
            
            <div className="max-w-full overflow-x-hidden">
              <Routes>
                <Route index element={<TeacherOverview />} />
                <Route path="overview" element={<TeacherOverview />} />
                <Route path="create-class" element={<CreateClass />} />
                <Route path="inbox" element={<TeacherInbox />} />
                <Route path="contacts" element={<TeacherContacts />} />
                <Route path="contacts/tags" element={<ContactManagement />} />
                <Route path="contacts/add" element={<ContactManagement />} />
                <Route path="profile" element={<TeacherProfile />} />
                <Route path="classes" element={<TeacherClasses />} />
                <Route path="stats" element={<TeacherStats />} />
                <Route path="reviews" element={<TeacherReviews />} />
                <Route path="waitlist" element={<TeacherWaitlist />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
