import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import Teach from "@/pages/Teach";
import BookingConfirmation from "@/pages/BookingConfirmation";
import Payment from "@/pages/Payment";
import BookingSuccess from "@/pages/BookingSuccess";
import Auth from "@/pages/Auth";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import UserDashboard from "@/pages/UserDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/class/:category/:id" element={<ClassDetails />} />
        <Route path="/teach" element={<Teach />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/user-dashboard/*" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;