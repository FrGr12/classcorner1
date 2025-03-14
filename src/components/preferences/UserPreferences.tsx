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
  const {
    toast
  } = useToast();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      console.log("Fetching preferences for user:", user.id);
      let userPreferences;
      const {
        data: prefData,
        error: prefError
      } = await supabase.from("user_preferences").select("*").eq("id", user.id).single();
      console.log("Preferences data:", prefData);

      if (prefError && prefError.code === "PGRST116") {
        const {
          data: newPrefData,
          error: createError
        } = await supabase.from("user_preferences").insert({
          id: user.id,
          interests: [],
          preferred_location: "",
          notification_preference: "both"
        }).select().single();
        if (createError) throw createError;
        console.log("Created new preferences:", newPrefData);
        userPreferences = newPrefData;
      } else if (prefError) {
        throw prefError;
      } else {
        userPreferences = prefData;
      }
      const {
        data: profileData,
        error: profileError
      } = await supabase.from("profiles").select("email_notifications, class_reminders, marketing_emails, first_name, last_name, email, phone").eq("id", user.id).single();
      if (profileError) throw profileError;
      console.log("Profile data:", profileData);
      const preferencesData: UserPreferencesData = {
        id: user.id,
        interests: userPreferences?.interests || [],
        preferred_location: userPreferences?.preferred_location || "",
        notification_preference: userPreferences?.notification_preference || "both",
        email_notifications: profileData?.email_notifications ?? true,
        class_reminders: profileData?.class_reminders ?? true,
        marketing_emails: profileData?.marketing_emails ?? false,
        first_name: profileData?.first_name || "",
        last_name: profileData?.last_name || "",
        email: profileData?.email || "",
        phone: profileData?.phone || ""
      };
      console.log("Setting preferences:", preferencesData);
      setPreferences(preferencesData);
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
      const {
        error: prefError
      } = await supabase.from("user_preferences").upsert({
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
      const {
        error: profileError
      } = await supabase.from("profiles").update(profileData).eq("id", preferences.id);
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

  const InterestsSection = () => {
    const [selectedInterest, setSelectedInterest] = useState("");
    const handleAddInterest = async () => {
      if (!preferences || !selectedInterest) {
        toast({
          variant: "destructive",
          title: "No interest selected",
          description: "Please select an interest to add"
        });
        return;
      }
      if (preferences.interests.includes(selectedInterest)) {
        toast({
          variant: "destructive",
          title: "Already added",
          description: "This interest is already in your list"
        });
        return;
      }
      try {
        const newInterests = [selectedInterest, ...preferences.interests];
        const {
          error
        } = await supabase.from("user_preferences").update({
          interests: newInterests
        }).eq("id", preferences.id);
        if (error) throw error;
        setPreferences({
          ...preferences,
          interests: newInterests
        });
        setSelectedInterest("");
        toast({
          title: "Success",
          description: "Interest added successfully"
        });
      } catch (error) {
        console.error("Error adding interest:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add interest"
        });
      }
    };
    const handleRemoveInterest = async (interestToRemove: string) => {
      if (!preferences) return;
      try {
        const newInterests = preferences.interests.filter(i => i !== interestToRemove);
        const {
          error
        } = await supabase.from("user_preferences").update({
          interests: newInterests
        }).eq("id", preferences.id);
        if (error) throw error;
        setPreferences({
          ...preferences,
          interests: newInterests
        });
        toast({
          title: "Success",
          description: "Interest removed successfully"
        });
      } catch (error) {
        console.error("Error removing interest:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to remove interest"
        });
      }
    };
    const availableCategories = categories.filter(category => !preferences?.interests.includes(category));
    return <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] items-start gap-2 sm:gap-4">
        <Label className="text-left flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Interests
        </Label>
        <div className="space-y-4">
          <div className="min-h-[40px] flex flex-wrap gap-2">
            {preferences?.interests && preferences.interests.length > 0 ? preferences.interests.map(interest => <Badge key={interest} variant="secondary" className="gap-1 text-xs sm:text-sm py-1 px-2">
                  {interest}
                  <button onClick={() => handleRemoveInterest(interest)} className="ml-1 hover:text-destructive" aria-label={`Remove ${interest}`}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>) : <p className="text-sm text-muted-foreground">No interests selected yet</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedInterest} onValueChange={setSelectedInterest}>
              <SelectTrigger className="flex-1 text-sm">
                <SelectValue placeholder="Select an interest" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map(category => <SelectItem key={category} value={category} className="text-sm">
                    {category}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleAddInterest} className="w-full sm:w-auto bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-sm" disabled={!selectedInterest}>
              Add Interest
            </Button>
          </div>
        </div>
      </div>;
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
    </div>;
  }

  return <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-left">Profile & Settings</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-left flex items-center gap-2 text-lg sm:text-xl">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] items-start sm:items-center gap-2 sm:gap-4">
            <Label className="text-left">First Name</Label>
            <Input 
              value={preferences?.first_name || ""} 
              onChange={e => setPreferences(prev => prev ? {
                ...prev,
                first_name: e.target.value
              } : null)} 
              placeholder="Enter your first name"
              className="text-sm"
            />
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-sm"
            >
              Save
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] items-start sm:items-center gap-2 sm:gap-4">
            <Label className="text-left">Last Name</Label>
            <Input 
              value={preferences?.last_name || ""} 
              onChange={e => setPreferences(prev => prev ? {
                ...prev,
                last_name: e.target.value
              } : null)} 
              placeholder="Enter your last name"
              className="text-sm"
            />
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-sm"
            >
              Save
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] items-start sm:items-center gap-2 sm:gap-4">
            <Label className="text-left flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input 
              value={preferences?.email || ""} 
              onChange={e => setPreferences(prev => prev ? {
                ...prev,
                email: e.target.value
              } : null)} 
              placeholder="Enter your email"
              type="email"
              className="text-sm"
            />
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-sm"
            >
              Save
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] items-start sm:items-center gap-2 sm:gap-4">
            <Label className="text-left flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone
            </Label>
            <Input 
              value={preferences?.phone || ""} 
              onChange={e => setPreferences(prev => prev ? {
                ...prev,
                phone: e.target.value
              } : null)} 
              placeholder="Enter your phone number"
              type="tel"
              className="text-sm"
            />
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-sm"
            >
              Save
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] items-start sm:items-center gap-2 sm:gap-4">
            <Label className="text-left flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Method
            </Label>
            <div className="text-sm text-muted-foreground">
              No payment methods added
            </div>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto border-[#6E44FF] text-[#6E44FF] hover:bg-[#6E44FF]/10 text-sm"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-left flex items-center gap-2 text-lg sm:text-xl">
            Preferences & Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <InterestsSection />
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] items-start gap-4">
            <Label className="text-left flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Select 
              value={preferences?.preferred_location || ""} 
              onValueChange={value => setPreferences(prev => prev ? {
                ...prev,
                preferred_location: value
              } : null)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => <SelectItem key={city} value={city} className="text-sm">
                    {city}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-sm"
            >
              Save
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-4">
            <Label className="text-left flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </Label>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-sm">Email Notifications</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={preferences?.email_notifications}
                  onCheckedChange={checked => setPreferences(prev => prev ? {
                    ...prev,
                    email_notifications: checked
                  } : null)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="class-reminders" className="text-sm">Class Reminders</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Get reminders before your upcoming classes
                  </p>
                </div>
                <Switch
                  id="class-reminders"
                  checked={preferences?.class_reminders}
                  onCheckedChange={checked => setPreferences(prev => prev ? {
                    ...prev,
                    class_reminders: checked
                  } : null)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails" className="text-sm">Marketing Communications</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Receive updates about new classes and special offers
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={preferences?.marketing_emails}
                  onCheckedChange={checked => setPreferences(prev => prev ? {
                    ...prev,
                    marketing_emails: checked
                  } : null)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={saving} 
          className="w-full sm:w-auto bg-[#6E44FF] hover:bg-[#6E44FF]/90" 
          size="lg"
        >
          {saving ? "Saving..." : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>;
};

export default UserPreferences;
