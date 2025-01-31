import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Rocket, Target, DollarSign, ChartBar, Badge } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PremiumFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  isActive: boolean;
}

const TeacherPremium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('teacher_premium_features')
        .select('*')
        .eq('teacher_id', user.id)
        .single();

      if (error) throw error;
      setIsPremium(data?.is_active || false);
    } catch (error) {
      console.error('Error checking premium status:', error);
      toast.error("Failed to load premium status");
    } finally {
      setLoading(false);
    }
  };

  const premiumFeatures: PremiumFeature[] = [
    {
      icon: Rocket,
      title: "Sponsored Listings",
      description: "Appear at the top of search & category pages",
      isActive: isPremium
    },
    {
      icon: Star,
      title: "Featured Teacher Badge",
      description: "Highlight your profile with a premium badge",
      isActive: isPremium
    },
    {
      icon: ChartBar,
      title: "Priority Matchmaking",
      description: "Get recommended first in AI-driven suggestions",
      isActive: isPremium
    },
    {
      icon: Target,
      title: "Retargeting Ads",
      description: "Advertise to users who viewed but didn't book",
      isActive: isPremium
    },
    {
      icon: DollarSign,
      title: "Discount & Bundle Deals",
      description: "Create promotional pricing strategies",
      isActive: isPremium
    },
    {
      icon: Badge,
      title: "Instant Boosts",
      description: "One-time promotions to increase visibility",
      isActive: isPremium
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Premium Features</h1>
          <p className="text-muted-foreground">
            Enhance your teaching profile with premium features
          </p>
        </div>
        {!isPremium && (
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Upgrade to Premium
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {premiumFeatures.map((feature, index) => (
          <Card key={index} className={`${!feature.isActive ? 'opacity-50' : ''}`}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <feature.icon className={`h-5 w-5 ${feature.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
              {!isPremium && (
                <Button variant="outline" className="mt-4 w-full" disabled>
                  Locked
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {isPremium && (
        <Card>
          <CardHeader>
            <CardTitle>Active Premium Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have access to all premium features. Manage your subscription settings and view usage statistics here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherPremium;