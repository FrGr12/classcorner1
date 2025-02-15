
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
import { Rocket, ArrowUp, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PromotionPricingProps {
  courseId: number;
  onPromotionComplete?: () => void;
}

const PROMOTION_PRICES = {
  sponsored: {
    "7days": 10,
    "14days": 15
  },
  boost: {
    "24hours": 5,
    "48hours": 10
  },
  outreach: {
    single: 2,
    bulk: 20 // for 10 students
  }
};

const PromotionPricing = ({ courseId, onPromotionComplete }: PromotionPricingProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSponsorClass = async (duration: "7days" | "14days") => {
    try {
      setIsLoading(true);
      const amount = PROMOTION_PRICES.sponsored[duration];
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + (duration === "7days" ? 7 : 14));

      // Use explicit type casting for the insert operation
      const { error } = await supabase
        .from('class_promotions' as any)
        .insert({
          course_id: courseId,
          promotion_type: 'sponsored',
          start_date: new Date().toISOString(),
          end_date: endDate.toISOString(),
          amount_paid: amount,
          status: 'active'
        });

      if (error) throw error;

      toast.success(`Class sponsored successfully for ${duration === "7days" ? "7" : "14"} days!`);
      onPromotionComplete?.();
    } catch (error: any) {
      console.error('Error sponsoring class:', error);
      toast.error("Failed to sponsor class");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBoostClass = async (duration: "24hours" | "48hours") => {
    try {
      setIsLoading(true);
      const amount = PROMOTION_PRICES.boost[duration];
      const endDate = new Date();
      endDate.setHours(endDate.getHours() + (duration === "24hours" ? 24 : 48));

      // Use explicit type casting for the insert operation
      const { error } = await supabase
        .from('class_promotions' as any)
        .insert({
          course_id: courseId,
          promotion_type: 'boost',
          start_date: new Date().toISOString(),
          end_date: endDate.toISOString(),
          amount_paid: amount,
          status: 'active'
        });

      if (error) throw error;

      toast.success(`Class boosted successfully for ${duration === "24hours" ? "24" : "48"} hours!`);
      onPromotionComplete?.();
    } catch (error: any) {
      console.error('Error boosting class:', error);
      toast.error("Failed to boost class");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Sponsored Listing
          </CardTitle>
          <CardDescription>
            Feature your class at the top of search results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSponsorClass("7days")}
            disabled={isLoading}
          >
            7 Days for ${PROMOTION_PRICES.sponsored["7days"]}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSponsorClass("14days")}
            disabled={isLoading}
          >
            14 Days for ${PROMOTION_PRICES.sponsored["14days"]}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUp className="h-5 w-5" />
            Boost Visibility
          </CardTitle>
          <CardDescription>
            Increase visibility for a short period
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleBoostClass("24hours")}
            disabled={isLoading}
          >
            24 Hours for ${PROMOTION_PRICES.boost["24hours"]}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleBoostClass("48hours")}
            disabled={isLoading}
          >
            48 Hours for ${PROMOTION_PRICES.boost["48hours"]}
          </Button>
        </CardContent>
      </Card>

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
            Contact Student (${PROMOTION_PRICES.outreach.single})
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Bulk Contact - 10 Students (${PROMOTION_PRICES.outreach.bulk})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionPricing;
