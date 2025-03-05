
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddPaymentMethodForm from "./AddPaymentMethodForm";
import SavedPaymentMethods from "./SavedPaymentMethods";

const stripePromise = loadStripe("pk_test_your_stripe_publishable_key");

const PaymentMethodsManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePaymentMethodAdded = () => {
    setIsDialogOpen(false);
    // Trigger a refresh of the payment methods list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Saved Payment Methods</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsDialogOpen(true)}
          className="gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <SavedPaymentMethods refreshTrigger={refreshTrigger} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <Elements stripe={stripePromise}>
            <AddPaymentMethodForm 
              onSuccess={handlePaymentMethodAdded}
              onCancel={() => setIsDialogOpen(false)}
            />
          </Elements>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethodsManagement;
