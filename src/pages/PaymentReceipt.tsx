
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface PaymentDetails {
  amount: number;
  created_at: string;
  receipt_url: string;
  booking: {
    course: {
      title: string;
      instructor: string;
      location: string;
    };
  };
}

const PaymentReceipt = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("payment_transactions")
          .select(`
            amount,
            created_at,
            receipt_url,
            booking:bookings (
              course:courses (
                title,
                instructor:profiles!courses_instructor_id_fkey (
                  first_name,
                  last_name
                ),
                location
              )
            )
          `)
          .eq("stripe_payment_intent_id", payment_intent)
          .single();

        if (error) throw error;
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (payment_intent) {
      fetchPaymentDetails();
    }
  }, [payment_intent]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!paymentDetails) {
    return <div>Payment details not found</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="outline"
          size="lg"
          className="mb-6 gap-2 text-base hover:bg-neutral-100"
          onClick={() => navigate("/student-dashboard/payments")}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to payments
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <CardTitle>Payment Successful</CardTitle>
                  <p className="text-sm text-neutral-600">
                    {format(new Date(paymentDetails.created_at), "PPP")}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-neutral-50 p-4">
                <h3 className="font-medium mb-2">
                  {paymentDetails.booking.course.title}
                </h3>
                <p className="text-neutral-600">
                  {paymentDetails.booking.course.instructor.first_name}{" "}
                  {paymentDetails.booking.course.instructor.last_name}
                </p>
                <p className="text-neutral-600">
                  {paymentDetails.booking.course.location}
                </p>
              </div>

              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Total Paid</span>
                <span className="font-semibold">${paymentDetails.amount}</span>
              </div>

              {paymentDetails.receipt_url && (
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.open(paymentDetails.receipt_url, "_blank")}
                >
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentReceipt;
