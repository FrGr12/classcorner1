
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, AlertCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

interface SavedPaymentMethodsProps {
  refreshTrigger?: number;
}

const SavedPaymentMethods = ({ refreshTrigger = 0 }: SavedPaymentMethodsProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    fetchPaymentMethods();
  }, [refreshTrigger]);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_payment_methods')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error: any) {
      console.error("Error fetching payment methods:", error);
      uiToast({
        variant: "destructive",
        title: "Failed to load payment methods",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMakeDefault = async (paymentMethodId: string) => {
    try {
      // Call edge function to update the payment method
      const { error } = await supabase.functions.invoke("save-payment-method", {
        body: {
          paymentMethodId,
          isDefault: true
        },
      });

      if (error) throw error;

      toast.success("Default payment method updated");
      fetchPaymentMethods();
    } catch (error: any) {
      console.error("Error updating payment method:", error);
      toast.error(error.message || "Failed to update payment method");
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    try {
      // For now, we'll just remove it from our database as Stripe doesn't have a direct
      // "delete payment method" API - they're detached when the customer is deleted
      const { error } = await supabase
        .from('user_payment_methods')
        .delete()
        .eq('id', paymentMethodId);

      if (error) throw error;

      toast.success("Payment method removed");
      fetchPaymentMethods();
    } catch (error: any) {
      console.error("Error removing payment method:", error);
      toast.error(error.message || "Failed to remove payment method");
    }
  };

  const getBrandIcon = (brand: string) => {
    // In a production app, you might want to add proper card icons
    return <CreditCard className="h-6 w-6 text-primary" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (paymentMethods.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-3 text-sm font-medium">No payment methods</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          You haven't added any payment methods yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <div 
          key={method.id}
          className={`flex items-center justify-between p-4 rounded-lg border ${
            method.is_default ? "bg-primary/5 border-primary/20" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            {getBrandIcon(method.brand)}
            <div>
              <p className="font-medium capitalize">
                {method.brand} •••• {method.last4}
                {method.is_default && (
                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires {method.exp_month}/{method.exp_year}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!method.is_default && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleMakeDefault(method.id)}
              >
                Make Default
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDeletePaymentMethod(method.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedPaymentMethods;
