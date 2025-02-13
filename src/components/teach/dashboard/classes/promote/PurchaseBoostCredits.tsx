
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PurchaseBoostCreditsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseComplete?: () => void;
}

const CREDIT_PRICE = 9.99;

const PurchaseBoostCredits = ({ open, onOpenChange, onPurchaseComplete }: PurchaseBoostCreditsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to purchase credits");
        return;
      }

      // Create purchase record
      const { error: purchaseError } = await supabase
        .from('boost_credit_purchases')
        .insert({
          teacher_id: user.id,
          amount: quantity,
          price: quantity * CREDIT_PRICE,
          payment_status: 'pending'
        });

      if (purchaseError) throw purchaseError;

      // TODO: Integrate with your payment provider
      // For now, we'll simulate a successful purchase
      
      // Update teacher's boost credits
      const { error: updateError } = await supabase.rpc('add_boost_credits', {
        p_teacher_id: user.id,
        p_amount: quantity
      });

      if (updateError) throw updateError;

      toast.success(`Successfully purchased ${quantity} boost credits!`);
      onPurchaseComplete?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error purchasing credits:', error);
      toast.error("Failed to purchase credits");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Boost Credits</DialogTitle>
          <DialogDescription>
            Boost credits help increase your class visibility in search results
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="quantity">Number of Credits</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            Price per credit: ${CREDIT_PRICE}
          </div>

          <div className="font-medium">
            Total: ${(quantity * CREDIT_PRICE).toFixed(2)}
          </div>

          <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Purchase Credits"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseBoostCredits;
