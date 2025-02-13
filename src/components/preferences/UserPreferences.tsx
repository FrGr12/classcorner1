
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

interface UserPreferencesData {
  id: string;
  interests: string[];
  preferred_location: string | null;
  notification_preference: "email" | "in_app" | "both" | "none";
  email_notifications: boolean;
  class_reminders: boolean;
  marketing_emails: boolean;
}

const UserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferencesData | null>(null);
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

      // Fetch from user_preferences for interests and location
      const { data: prefData, error: prefError } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", user.id)
        .single();

      if (prefError && prefError.code !== "PGRST116") throw prefError;

      // Fetch from profiles for notification settings
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("email_notifications, class_reminders, marketing_emails")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      setPreferences({
        id: user.id,
        interests: prefData?.interests || [],
        preferred_location: prefData?.preferred_location || null,
        notification_preference: prefData?.notification_preference || "both",
        email_notifications: profileData?.email_notifications ?? true,
        class_reminders: profileData?.class_reminders ?? true,
        marketing_emails: profileData?.marketing_emails ?? false,
      });
    } catch (error: any) {
      console.error("Error fetching preferences:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your preferences",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!preferences) return;
    
    setSaving(true);
    try {
      // Update user_preferences
      const { error: prefError } = await supabase
        .from("user_preferences")
        .upsert({
          id: preferences.id,
          interests: preferences.interests,
          preferred_location: preferences.preferred_location,
          notification_preference: preferences.notification_preference,
        });

      if (prefError) throw prefError;

      // Update profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          email_notifications: preferences.email_notifications,
          class_reminders: preferences.class_reminders,
          marketing_emails: preferences.marketing_emails,
        })
        .eq("id", preferences.id);

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Your preferences have been saved.",
      });
    } catch (error: any) {
      console.error("Error saving preferences:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your preferences",
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile & Preferences</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Interests</CardTitle>
          <CardDescription>
            Select your interests to get personalized class recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>
            Set your preferred location for class recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Manage how you want to receive updates and reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={preferences?.email_notifications}
              onCheckedChange={(checked) =>
                setPreferences(prev => prev ? { ...prev, email_notifications: checked } : null)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="class-reminders">Class Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminders before your upcoming classes
              </p>
            </div>
            <Switch
              id="class-reminders"
              checked={preferences?.class_reminders}
              onCheckedChange={(checked) =>
                setPreferences(prev => prev ? { ...prev, class_reminders: checked } : null)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about new classes and special offers
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={preferences?.marketing_emails}
              onCheckedChange={(checked) =>
                setPreferences(prev => prev ? { ...prev, marketing_emails: checked } : null)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-accent-purple hover:bg-accent-purple/90"
      >
        {saving ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  );
};

export default UserPreferences;
