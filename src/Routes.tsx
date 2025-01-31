import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import BookingConfirmation from "@/pages/BookingConfirmation";
import Payment from "@/pages/Payment";
import BookingSuccess from "@/pages/BookingSuccess";
import PasswordReset from "@/pages/PasswordReset";
import PaymentFailed from "@/pages/PaymentFailed";
import EmailVerification from "@/pages/EmailVerification";
import { Toaster } from "@/components/ui/toaster";

export const Routes = () => {
  return (
    <>
      <RouterRoutes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/reset-password" element={<PasswordReset />} />
        <Route path="/auth/verify" element={<EmailVerification />} />
        <Route path="/about" element={<About />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/class/:category/:id" element={<ClassDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </RouterRoutes>
      <Toaster />
    </>
  );
};