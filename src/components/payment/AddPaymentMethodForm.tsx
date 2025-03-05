
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AddPaymentMethodFormProps {
  onSuccess?: (paymentMethod: any) => void;
  onCancel?: () => void;
}

const AddPaymentMethodForm = ({ onSuccess, onCancel }: AddPaymentMethodFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isDefault, setIsDefault] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (!paymentMethod) {
        throw new Error("Failed to create payment method");
      }

      // Save payment method
      const { data, error } = await supabase.functions.invoke("save-payment-method", {
        body: {
          paymentMethodId: paymentMethod.id,
          isDefault
        },
      });

      if (error) throw error;

      toast.success("Payment method added successfully");
      cardElement.clear();
      onSuccess?.(data.paymentMethod);
    } catch (error: any) {
      console.error("Error adding payment method:", error);
      toast.error(error.message || "Failed to add payment method");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="card-element">Card details</Label>
        <div className="border rounded-md p-3">
          <CardElement 
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="default-payment" 
          checked={isDefault}
          onCheckedChange={(checked) => setIsDefault(checked === true)}
        />
        <Label htmlFor="default-payment" className="text-sm font-normal">
          Set as default payment method
        </Label>
      </div>

      <div className="flex gap-2 justify-end">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : "Add Payment Method"}
        </Button>
      </div>
    </form>
  );
};

export default AddPaymentMethodForm;
