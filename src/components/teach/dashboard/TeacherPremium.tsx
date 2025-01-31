import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Rocket, Target, ChartBar, Badge, Megaphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PremiumFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  isActive: boolean;
  actionLabel?: string;
  action?: () => void;
}

const TeacherPremium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleFeatureAction = (feature: string) => {
    switch (feature) {
      case "promotions":
        navigate("/teach/promotions");
        break;
      case "boost":
        if (!isPremium) {
          toast.error("Please upgrade to premium to use instant boosts");
          return;
        }
        navigate("/teach/promotions");
        break;
      default:
        if (!isPremium) {
          toast.error("This feature requires a premium subscription");
        }
    }
  };

  const premiumFeatures: PremiumFeature[] = [
    {
      icon: Megaphone,
      title: "Sponsored Listings",
      description: "Get featured at the top of search results and category pages",
      isActive: isPremium,
      actionLabel: "Manage Listings",
      action: () => handleFeatureAction("sponsored")
    },
    {
      icon: Star,
      title: "Featured Teacher Badge",
      description: "Stand out with a premium badge on your profile and listings",
      isActive: isPremium
    },
    {
      icon: ChartBar,
      title: "Priority Matchmaking",
      description: "Get recommended first in student matches and suggestions",
      isActive: isPremium
    },
    {
      icon: Target,
      title: "Retargeting Ads",
      description: "Re-engage with students who viewed your classes",
      isActive: isPremium,
      actionLabel: "View Analytics",
      action: () => handleFeatureAction("retargeting")
    },
    {
      icon: Badge,
      title: "Promotional Tools",
      description: "Create discounts, bundles, and special offers",
      isActive: isPremium,
      actionLabel: "Manage Promotions",
      action: () => handleFeatureAction("promotions")
    },
    {
      icon: Rocket,
      title: "Instant Boosts",
      description: "Temporary visibility boost for your classes",
      isActive: isPremium,
      actionLabel: "Use Boost",
      action: () => handleFeatureAction("boost")
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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            onClick={() => toast.success("Upgrade flow will be implemented here")}
          >
            Upgrade to Premium
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {premiumFeatures.map((feature, index) => (
          <Card key={index} className={`${!feature.isActive ? 'opacity-50' : ''} transition-all hover:shadow-md`}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <feature.icon className={`h-5 w-5 ${feature.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{feature.description}</CardDescription>
              {feature.actionLabel && (
                <Button 
                  variant={feature.isActive ? "default" : "outline"} 
                  className="w-full"
                  onClick={feature.action}
                  disabled={!feature.isActive}
                >
                  {feature.actionLabel}
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
              You have access to all premium features. Use the buttons above to manage individual features.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherPremium;