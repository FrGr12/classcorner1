
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { ClassItem } from "@/types/class";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_your_publishable_key");

const CheckoutForm = ({ amount, bookingId }: { amount: number; bookingId: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-receipt`,
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed");
      navigate("/payment-failed", {
        state: { error: error.message, bookingId }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        className="w-full gap-2"
        size="lg"
        disabled={!stripe || isProcessing}
      >
        <CreditCard className="h-5 w-5" />
        {isProcessing ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const classItem = location.state?.classItem as ClassItem;
  const bookingId = location.state?.bookingId as number;

  useEffect(() => {
    if (!classItem || !bookingId) {
      navigate("/");
      return;
    }

    const initializePayment = async () => {
      try {
        const response = await supabase.functions.invoke("create-payment-intent", {
          body: {
            amount: classItem.price,
            bookingId,
          },
        });

        if (response.error) throw response.error;
        setClientSecret(response.data.clientSecret);
      } catch (error: any) {
        console.error("Failed to initialize payment:", error);
        toast.error("Failed to initialize payment");
        navigate("/payment-failed", {
          state: { error: error.message, bookingId, classItem }
        });
      }
    };

    initializePayment();
  }, [classItem, bookingId, navigate]);

  if (!classItem || !bookingId || !clientSecret) return null;

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="outline"
          size="lg"
          className="mb-6 gap-2 text-base hover:bg-neutral-100"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to booking details
        </Button>

        <h1 className="text-3xl font-bold mb-8">Complete Payment</h1>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-neutral-50 p-4">
                <h3 className="font-medium mb-2">{classItem.title}</h3>
                <p className="text-neutral-600">{classItem.instructor}</p>
                <p className="text-neutral-600">{classItem.city}</p>
              </div>

              <div className="flex justify-between items-center text-lg mb-6">
                <span className="font-medium">Total Amount</span>
                <span className="font-semibold">${classItem.price}</span>
              </div>

              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                  },
                }}
              >
                <CheckoutForm amount={classItem.price} bookingId={bookingId} />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
