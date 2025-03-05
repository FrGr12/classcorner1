
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Promotion Credits
        </CardTitle>
        <CardDescription>
          Purchase and manage your promotion credits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted p-4">
          <div className="text-sm font-medium">Current Balance</div>
          <div className="mt-1 text-2xl font-bold">{credits || 0} Credits</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Use credits to boost your classes and reach more students
          </div>
        </div>

        <div>
          <div className="mb-4 text-sm font-medium">Purchase Credits</div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(CREDIT_PRICES).map(([amount, price]) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => handleBuyCredits(parseInt(amount))}
                disabled={isLoading}
                className="h-auto py-4"
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>{amount} Credits</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
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
