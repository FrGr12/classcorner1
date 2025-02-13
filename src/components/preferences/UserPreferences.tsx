
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X, Save, User, Mail, Phone, CreditCard, MapPin, Bell, Settings } from "lucide-react";

const categories = ["Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making", "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance", "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"];
const cities = ["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping"];

interface UserPreferencesData {
  id: string;
  interests: string[];
  preferred_location: string;
  notification_preference: "email" | "in_app" | "both" | "none";
  email_notifications: boolean;
  class_reminders: boolean;
  marketing_emails: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface ProfileUpdateData {
  email_notifications: boolean;
  class_reminders: boolean;
  marketing_emails: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const UserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferencesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data: prefData, error: prefError } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", user.id)
        .single();
        
      if (prefError && prefError.code !== "PGRST116") throw prefError;
      
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("email_notifications, class_reminders, marketing_emails, first_name, last_name, email, phone")
        .eq("id", user.id)
        .single();
        
      if (profileError) throw profileError;

      setPreferences({
        id: user.id,
        interests: prefData?.interests || [],
        preferred_location: prefData?.preferred_location || "",
        notification_preference: prefData?.notification_preference || "both",
        email_notifications: profileData?.email_notifications ?? true,
        class_reminders: profileData?.class_reminders ?? true,
        marketing_emails: profileData?.marketing_emails ?? false,
        first_name: profileData?.first_name || "",
        last_name: profileData?.last_name || "",
        email: profileData?.email || "",
        phone: profileData?.phone || ""
      });
    } catch (error: any) {
      console.error("Error fetching preferences:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your preferences"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!preferences) return;
    setSaving(true);
    try {
      const { error: prefError } = await supabase
        .from("user_preferences")
        .upsert({
          id: preferences.id,
          interests: preferences.interests,
          preferred_location: preferences.preferred_location,
          notification_preference: preferences.notification_preference
        });
      
      if (prefError) throw prefError;

      const profileData: ProfileUpdateData = {
        email_notifications: preferences.email_notifications,
        class_reminders: preferences.class_reminders,
        marketing_emails: preferences.marketing_emails,
        first_name: preferences.first_name,
        last_name: preferences.last_name,
        email: preferences.email,
        phone: preferences.phone
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", preferences.id);

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Your preferences have been saved."
      });
    } catch (error: any) {
      console.error("Error saving preferences:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your preferences"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddInterest = () => {
    if (!selectedInterest || !preferences) {
      toast({
        title: "No interest selected",
        description: "Please select an interest to add.",
        variant: "destructive",
      });
      return;
    }

    if (preferences.interests.includes(selectedInterest)) {
      toast({
        title: "Interest already added",
        description: "This interest is already in your list.",
        variant: "destructive",
      });
      return;
    }

    setPreferences(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        interests: [...prev.interests, selectedInterest]
      };
    });

    // Save immediately after adding
    handleSave();
    setSelectedInterest(""); // Reset selection
  };

  const removeInterest = (interest: string) => {
    if (!preferences) return;
    
    setPreferences(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      };
    });
    
    // Save immediately after removing
    handleSave();
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
    </div>;
  }

  return <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-left">Profile & Settings</h1>
          <p className="text-sm text-muted-foreground text-left">
            Manage your personal information, preferences, and account settings
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-left flex items-center gap-2">
            <User className="w-5 h-5" />
            Basic Information
          </CardTitle>
          <CardDescription className="text-left">
            Manage your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
            <Label className="text-left">First Name</Label>
            <Input value={preferences?.first_name || ""} onChange={e => setPreferences(prev => prev ? {
            ...prev,
            first_name: e.target.value
          } : null)} placeholder="Enter your first name" />
            <Button onClick={handleSave} className="bg-[#6E44FF] hover:bg-[#6E44FF]/90">
              Save
            </Button>
          </div>

          <div className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
            <Label className="text-left">Last Name</Label>
            <Input value={preferences?.last_name || ""} onChange={e => setPreferences(prev => prev ? {
            ...prev,
            last_name: e.target.value
          } : null)} placeholder="Enter your last name" />
            <Button onClick={handleSave} className="bg-[#6E44FF] hover:bg-[#6E44FF]/90">
              Save
            </Button>
          </div>

          <div className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
            <Label className="text-left flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input value={preferences?.email || ""} onChange={e => setPreferences(prev => prev ? {
            ...prev,
            email: e.target.value
          } : null)} placeholder="Enter your email" type="email" />
            <Button onClick={handleSave} className="bg-[#6E44FF] hover:bg-[#6E44FF]/90">
              Save
            </Button>
          </div>

          <div className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
            <Label className="text-left flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone
            </Label>
            <Input value={preferences?.phone || ""} onChange={e => setPreferences(prev => prev ? {
            ...prev,
            phone: e.target.value
          } : null)} placeholder="Enter your phone number" type="tel" />
            <Button onClick={handleSave} className="bg-[#6E44FF] hover:bg-[#6E44FF]/90">
              Save
            </Button>
          </div>

          <div className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
            <Label className="text-left flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Method
            </Label>
            <div className="text-sm text-muted-foreground">
              No payment methods added
            </div>
            <Button variant="outline" className="border-[#6E44FF] text-[#6E44FF] hover:bg-[#6E44FF]/10">
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-left flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Preferences & Settings
          </CardTitle>
          <CardDescription className="text-left">
            Customize your experience and communication preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[180px_1fr_auto] items-start gap-4">
            <Label className="text-left flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Interests
            </Label>
            <div className="space-y-2">
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
              <Select
                value={selectedInterest}
                onValueChange={setSelectedInterest}
              >
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
            <Button 
              variant="outline"
              className="border-[#6E44FF] text-[#6E44FF] hover:bg-[#6E44FF]/10"
              onClick={handleAddInterest}
            >
              Add
            </Button>
          </div>

          <div className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
            <Label className="text-left flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Select value={preferences?.preferred_location || ""} onValueChange={value => setPreferences(prev => prev ? {
            ...prev,
            preferred_location: value
          } : null)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleSave} className="bg-[#6E44FF] hover:bg-[#6E44FF]/90">
              Save
            </Button>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-start gap-4">
            <Label className="text-left flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch id="email-notifications" checked={preferences?.email_notifications} onCheckedChange={checked => setPreferences(prev => prev ? {
                ...prev,
                email_notifications: checked
              } : null)} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label htmlFor="class-reminders">Class Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders before your upcoming classes
                  </p>
                </div>
                <Switch id="class-reminders" checked={preferences?.class_reminders} onCheckedChange={checked => setPreferences(prev => prev ? {
                ...prev,
                class_reminders: checked
              } : null)} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label htmlFor="marketing-emails">Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new classes and special offers
                  </p>
                </div>
                <Switch id="marketing-emails" checked={preferences?.marketing_emails} onCheckedChange={checked => setPreferences(prev => prev ? {
                ...prev,
                marketing_emails: checked
              } : null)} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="bg-[#6E44FF] hover:bg-[#6E44FF]/90" size="lg">
          {saving ? "Saving..." : <>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </>}
        </Button>
      </div>
    </div>;
};

export default UserPreferences;
