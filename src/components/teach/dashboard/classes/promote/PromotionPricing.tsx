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
  courseId: number | null;
  promotionType?: 'boost' | 'sponsor' | 'outreach';
  onPromotionComplete?: () => void;
}

const PROMOTION_PRICES = {
  sponsored: {
    "7days": {
      single: 10,
      all: 25
    },
    "14days": {
      single: 15,
      all: 35
    }
  },
  boost: {
    "24hours": {
      single: 5,
      all: 12
    },
    "48hours": {
      single: 10,
      all: 24
    }
  },
  outreach: {
    single: 2,
    bulk: 20
  }
};

const PromotionPricing = ({ courseId, promotionType, onPromotionComplete }: PromotionPricingProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSponsorClass = async (duration: "7days" | "14days") => {
    try {
      setIsLoading(true);
      const amount = courseId ? 
        PROMOTION_PRICES.sponsored[duration].single : 
        PROMOTION_PRICES.sponsored[duration].all;
      
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + (duration === "7days" ? 7 : 14));

      const { error } = await supabase
        .from('class_promotions')
        .insert({
          course_id: courseId,
          promotion_type: 'sponsored',
          start_date: new Date().toISOString(),
          end_date: endDate.toISOString(),
          amount_paid: amount,
          status: 'active'
        });

      if (error) throw error;

      toast.success(`${courseId ? 'Class' : 'All classes'} sponsored successfully for ${duration === "7days" ? "7" : "14"} days!`);
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
      const amount = courseId ? 
        PROMOTION_PRICES.boost[duration].single : 
        PROMOTION_PRICES.boost[duration].all;

      const endDate = new Date();
      endDate.setHours(endDate.getHours() + (duration === "24hours" ? 24 : 48));

      const { error } = await supabase
        .from('class_promotions')
        .insert({
          course_id: courseId,
          promotion_type: 'boost',
          start_date: new Date().toISOString(),
          end_date: endDate.toISOString(),
          amount_paid: amount,
          status: 'active'
        });

      if (error) throw error;

      toast.success(`${courseId ? 'Class' : 'All classes'} boosted successfully for ${duration === "24hours" ? "24" : "48"} hours!`);
      onPromotionComplete?.();
    } catch (error: any) {
      console.error('Error boosting class:', error);
      toast.error("Failed to boost class");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
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
                {courseId ? "Increase visibility for your class" : "Boost all your classes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleBoostClass("24hours")}
                disabled={isLoading}
              >
                24 Hours for ${courseId ? PROMOTION_PRICES.boost["24hours"].single : PROMOTION_PRICES.boost["24hours"].all}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleBoostClass("48hours")}
                disabled={isLoading}
              >
                48 Hours for ${courseId ? PROMOTION_PRICES.boost["48hours"].single : PROMOTION_PRICES.boost["48hours"].all}
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
                {courseId ? "Feature your class at the top" : "Feature all your classes at the top"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSponsorClass("7days")}
                disabled={isLoading}
              >
                7 Days for ${courseId ? PROMOTION_PRICES.sponsored["7days"].single : PROMOTION_PRICES.sponsored["7days"].all}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSponsorClass("14days")}
                disabled={isLoading}
              >
                14 Days for ${courseId ? PROMOTION_PRICES.sponsored["14days"].single : PROMOTION_PRICES.sponsored["14days"].all}
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
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default PromotionPricing;
