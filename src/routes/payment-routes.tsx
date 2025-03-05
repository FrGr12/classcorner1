
import { RouteObject } from "react-router-dom";
import Payment from "@/pages/Payment";
import PaymentReceipt from "@/pages/PaymentReceipt";
import PaymentFailed from "@/pages/PaymentFailed";
import BookingConfirmation from "@/pages/BookingConfirmation";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/error/ErrorBoundary";

export const paymentRoutes: RouteObject[] = [
  {
    path: "/payment",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <Payment />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/payment-receipt",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <PaymentReceipt />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/payment-failed",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <PaymentFailed />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/booking-confirmation",
    element: (
      <ErrorBoundary>
        <BookingConfirmation />
      </ErrorBoundary>
    ),
  },
];
