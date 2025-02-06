
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const categories = [
  "Pottery",
  "Cooking",
  "Baking",
  "Painting & Art",
  "Candle Making",
  "Jewellery & Metal",
  "Cocktail & Wine",
  "Photography",
  "Music & Dance",
  "Wood Craft",
  "Textile Craft",
  "Paper Craft",
  "Flower & Plants",
];

const cities = [
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
  "Jönköping",
  "Norrköping",
];

interface UserPreferences {
  id: string;
  interests: string[];
  preferred_location: string | null;
  notification_preference: "email" | "in_app" | "both" | "none";
}

const UserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      setPreferences(data || { id: user.id, interests: [], preferred_location: null, notification_preference: "both" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!preferences) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("user_preferences")
        .upsert(preferences);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your preferences have been saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const addInterest = (interest: string) => {
    if (!preferences || preferences.interests.includes(interest)) return;
    setPreferences({
      ...preferences,
      interests: [...preferences.interests, interest],
    });
  };

  const removeInterest = (interest: string) => {
    if (!preferences) return;
    setPreferences({
      ...preferences,
      interests: preferences.interests.filter((i) => i !== interest),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
        <CardDescription>
          Customize your interests and notification settings to get personalized course recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Your Interests</label>
          <div className="flex flex-wrap gap-2">
            {preferences?.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="gap-1">
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Select onValueChange={addInterest}>
            <SelectTrigger>
              <SelectValue placeholder="Add an interest" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((c) => !preferences?.interests.includes(c))
                .map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Preferred Location</label>
          <Select
            value={preferences?.preferred_location || ""}
            onValueChange={(value) =>
              setPreferences(prev => prev ? { ...prev, preferred_location: value } : null)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Notification Preferences</label>
          <Select
            value={preferences?.notification_preference || "both"}
            onValueChange={(value: "email" | "in_app" | "both" | "none") =>
              setPreferences(prev => prev ? { ...prev, notification_preference: value } : null)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email only</SelectItem>
              <SelectItem value="in_app">In-app only</SelectItem>
              <SelectItem value="both">Both email and in-app</SelectItem>
              <SelectItem value="none">No notifications</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          {saving ? "Saving..." : "Save Preferences"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
