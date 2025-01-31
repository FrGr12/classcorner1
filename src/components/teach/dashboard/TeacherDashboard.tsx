import { Routes, Route } from "react-router-dom";
import TeacherDashboardSidebar from "./TeacherDashboardSidebar";
import TeacherOverview from "./TeacherOverview";
import TeacherBookings from "./TeacherBookings";
import TeacherAnalytics from "./TeacherAnalytics";
import TeacherClasses from "./TeacherClasses";
import TeacherMessages from "./TeacherMessages";
import TeacherProfile from "./TeacherProfile";
import TeacherPromotions from "./TeacherPromotions";
import TeacherReviews from "./TeacherReviews";
import TeacherWaitlist from "./TeacherWaitlist";
import TeacherCRM from "./TeacherCRM";
import PaymentHistory from "./payments/PaymentHistory";
import { SidebarProvider } from "@/contexts/SidebarContext";

const TeacherDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <TeacherDashboardSidebar />
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            <Routes>
              <Route index element={<TeacherOverview />} />
              <Route path="bookings" element={<TeacherBookings />} />
              <Route path="analytics" element={<TeacherAnalytics />} />
              <Route path="classes" element={<TeacherClasses />} />
              <Route path="messages" element={<TeacherMessages />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="promotions" element={<TeacherPromotions />} />
              <Route path="reviews" element={<TeacherReviews />} />
              <Route path="waitlist" element={<TeacherWaitlist />} />
              <Route path="crm" element={<TeacherCRM />} />
              <Route path="payments" element={<PaymentHistory />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;