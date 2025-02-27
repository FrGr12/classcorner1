
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CREDIT_PRICES = {
  1: 10,
  2: 20,
  5: 45,
  10: 80
};

export function TeacherCredits() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: credits, refetch: refetchCredits } = useQuery({
    queryKey: ['teacherCredits'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: teacherFeatures, error } = await supabase
        .from('teacher_premium_features')
        .select('boost_credits')
        .eq('teacher_id', user.id)
        .maybeSingle();
      
      if (error) throw error;

      if (!teacherFeatures) {
        const { data: newFeatures, error: insertError } = await supabase
          .from('teacher_premium_features')
          .insert({
            teacher_id: user.id,
            boost_credits: 3,
            is_active: true
          })
          .select('boost_credits')
          .single();

        if (insertError) throw insertError;
        return newFeatures.boost_credits;
      }

      return teacherFeatures.boost_credits;
    }
  });

  const handleBuyCredits = async (amount: number) => {
    try {
      setIsLoading(true);
      const price = CREDIT_PRICES[amount as keyof typeof CREDIT_PRICES];

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('boost_credit_purchases')
        .insert({
          amount,
          price,
          payment_status: 'pending',
          teacher_id: user.id
        });

      if (error) throw error;

      toast.success(`Successfully purchased ${amount} credits!`);
      refetchCredits();
    } catch (error: any) {
      console.error('Error purchasing credits:', error);
      toast.error("Failed to purchase credits");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl">
          <Wallet className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
          Promotion Credits
        </CardTitle>
        <CardDescription className="text-[10px] sm:text-sm">
          Purchase and manage your promotion credits
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-6">
        <div className="rounded-lg bg-muted p-2.5 sm:p-4">
          <div className="text-[10px] sm:text-sm font-medium">Current Balance</div>
          <div className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold">{credits || 0} Credits</div>
          <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs text-muted-foreground">
            Use credits to boost your classes and reach more students
          </div>
        </div>

        <div>
          <div className="mb-2 sm:mb-4 text-[10px] sm:text-sm font-medium">Purchase Credits</div>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-4">
            {Object.entries(CREDIT_PRICES).map(([amount, price]) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => handleBuyCredits(parseInt(amount))}
                disabled={isLoading}
                className="h-auto py-1.5 sm:py-4 text-[9px] sm:text-sm"
              >
                <div className="text-left">
                  <div className="flex items-center gap-0.5 sm:gap-2">
                    <Plus className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                    <span>{amount} Credits</span>
                  </div>
                  <div className="mt-0 sm:mt-1 text-[8px] sm:text-sm text-muted-foreground">
                    {price} SEK
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
