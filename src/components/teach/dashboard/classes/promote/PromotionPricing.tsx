
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Rocket, ArrowUp, MessageSquare, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface PromotionPricingProps {
  courseIds: string[];
  promotionType?: 'boost' | 'sponsor' | 'outreach';
  onPromotionComplete?: () => void;
}

const CREDIT_PRICES = {
  1: 10,
  2: 20,
  5: 45,
  10: 80
};

const PromotionPricing = ({ courseIds, promotionType, onPromotionComplete }: PromotionPricingProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: credits, refetch: refetchCredits } = useQuery({
    queryKey: ['teacherCredits'],
    queryFn: async () => {
      const { data: teacherFeatures, error } = await supabase
        .from('teacher_premium_features')
        .select('boost_credits')
        .single();
      
      if (error) throw error;
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

  const handleAction = async (action: string, duration: string) => {
    try {
      setIsLoading(true);
      const creditsNeeded = courseIds.length;

      if (credits && credits < creditsNeeded) {
        toast.error(`You need ${creditsNeeded} credits for this action. Please purchase more credits.`);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Process the promotion action
      const { error } = await supabase
        .from('class_promotions')
        .insert(
          courseIds.map(courseId => ({
            course_id: parseInt(courseId),
            promotion_type: action,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + (duration === "24hours" ? 24 : 48) * 60 * 60 * 1000).toISOString(),
            status: 'active',
            amount_paid: creditsNeeded
          }))
        );

      if (error) throw error;

      // Update teacher's credit balance
      const { error: updateError } = await supabase
        .from('teacher_premium_features')
        .update({ boost_credits: credits - creditsNeeded })
        .eq('teacher_id', user.id);

      if (updateError) throw updateError;

      toast.success(`Action completed successfully!`);
      refetchCredits();
      onPromotionComplete?.();
    } catch (error: any) {
      console.error('Error processing action:', error);
      toast.error("Failed to process action");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCreditPurchaseOptions = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Purchase Credits
        </CardTitle>
        <CardDescription>
          Current balance: {credits || 0} credits
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {Object.entries(CREDIT_PRICES).map(([amount, price]) => (
          <Button
            key={amount}
            variant="outline"
            onClick={() => handleBuyCredits(parseInt(amount))}
            disabled={isLoading}
          >
            {amount} credits for {price} SEK
          </Button>
        ))}
      </CardContent>
    </Card>
  );

  const renderActionContent = () => {
    switch (promotionType) {
      case 'boost':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Boost Visibility
              </CardTitle>
              <CardDescription>
                Selected classes: {courseIds.length}
                <br />
                Credits needed: {courseIds.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleAction('boost', '24hours')}
                disabled={isLoading || !courseIds.length}
              >
                24 Hours Boost (1 credit per class)
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleAction('boost', '48hours')}
                disabled={isLoading || !courseIds.length}
              >
                48 Hours Boost (1 credit per class)
              </Button>
            </CardContent>
          </Card>
        );

      case 'sponsor':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUp className="h-5 w-5" />
                Sponsored Listing
              </CardTitle>
              <CardDescription>
                {courseIds.length === 1 ? "Feature your class at the top" : "Feature all your classes at the top"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleAction('sponsor', '7days')}
                disabled={isLoading}
              >
                7 Days for ${courseIds.length === 1 ? CREDIT_PRICES[1] : CREDIT_PRICES[5]}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleAction('sponsor', '14days')}
                disabled={isLoading}
              >
                14 Days for ${courseIds.length === 1 ? CREDIT_PRICES[2] : CREDIT_PRICES[10]}
              </Button>
            </CardContent>
          </Card>
        );

      case 'outreach':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Student Outreach
              </CardTitle>
              <CardDescription>
                Contact matched students directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                Contact Student (${CREDIT_PRICES[1]})
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                Bulk Contact - 10 Students (${CREDIT_PRICES[2]})
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderActionContent()}
      {renderCreditPurchaseOptions()}
    </div>
  );
};

export default PromotionPricing;
