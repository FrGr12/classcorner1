import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ClassItem } from "@/types/class";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(16),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(4),
  name: z.string().min(1, "Name is required"),
});

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const classItem = location.state?.classItem as ClassItem;

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
    },
  });

  if (!classItem) {
    navigate("/");
    return null;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data: PaymentFormData) => {
    try {
      toast({
        title: "Processing payment...",
        duration: 2000,
      });

      // Simulate payment processing
      const success = Math.random() > 0.5; // Simulate 50% success rate for testing

      if (!success) {
        throw new Error("Payment declined by issuer");
      }

      // If payment successful
      setTimeout(() => {
        navigate("/booking-success", { state: { classItem } });
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Payment processing failed";
      navigate("/payment-failed", { 
        state: { error: errorMessage, classItem },
        replace: true 
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="mb-6 gap-2 text-base hover:bg-neutral-100"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to booking details
          </Button>

          <h1 className="text-3xl font-bold mb-8">Payment Details</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Enter Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1234 5678 9012 3456" 
                            {...field}
                            maxLength={16}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="MM/YY" 
                              {...field}
                              maxLength={5}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value.length === 2 && !value.includes('/')) {
                                  value += '/';
                                }
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123" 
                              {...field}
                              maxLength={4}
                              type="password"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Amount</span>
                      <span className="text-xl font-semibold">${classItem.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      size="lg"
                      className="w-full text-base"
                      onClick={handleGoBack}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full text-base"
                    >
                      Pay Now
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;