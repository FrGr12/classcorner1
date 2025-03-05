
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSearchLogic } from "@/components/landing/search/hooks/useSearchLogic";
import MatchPreferencesForm from "./matches/MatchPreferencesForm";
import { LoadingState } from "./LoadingState";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
}

export default function UserPreferencesPage() {
  const { toast } = useToast();
  const {
    selectedCategories,
    setSelectedCategories,
    selectedLocations,
    setSelectedLocations,
    userPreferences,
    isLoadingPreferences,
    updatePreferences
  } = useSearchLogic();

  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoadingProfile(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, phone, location')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      await updatePreferences();
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update preferences. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          location: profile.location
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update email in auth if it has changed
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email !== profile.email) {
        const { error: updateError } = await supabase.auth.updateUser({
          email: profile.email,
        });
        
        if (updateError) throw updateError;
        
        toast({
          title: "Email Verification Required",
          description: "Please check your email to verify your new email address.",
        });
      }

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEnableMatching = (location: string, categories: string[]) => {
    setSelectedLocations([location]);
    setSelectedCategories(categories);
    handleSavePreferences();
  };

  if (isLoadingPreferences || isLoadingProfile) {
    return <LoadingState />;
  }

  // Default values for email preferences when they don't exist in the data
  const emailPreferences = userPreferences || {
    interests: [],
    preferred_location: null,
    marketing_emails: false,
    class_reminders: false,
    email_notifications: false
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Preferences</h1>
        <p className="text-muted-foreground">
          Manage your profile information, class recommendations, and notification preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={profile?.first_name || ''} 
                    onChange={(e) => setProfile(prev => prev ? {...prev, first_name: e.target.value} : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={profile?.last_name || ''} 
                    onChange={(e) => setProfile(prev => prev ? {...prev, last_name: e.target.value} : null)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profile?.email || ''} 
                  onChange={(e) => setProfile(prev => prev ? {...prev, email: e.target.value} : null)}
                />
                <p className="text-xs text-muted-foreground">
                  Changing your email will require reverification.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={profile?.phone || ''} 
                  onChange={(e) => setProfile(prev => prev ? {...prev, phone: e.target.value} : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input 
                  id="location" 
                  value={profile?.location || ''} 
                  onChange={(e) => setProfile(prev => prev ? {...prev, location: e.target.value} : null)}
                />
              </div>
              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Saving..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendation Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <MatchPreferencesForm
              onEnableMatching={handleEnableMatching}
              initialLocation={selectedLocations[0] === "Everywhere" ? "" : selectedLocations[0]}
              initialCategories={selectedCategories}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage what types of emails you receive from us. Your email address 
              will always be used for important account notifications.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Marketing emails</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={async () => {
                    try {
                      const { data: { user } } = await supabase.auth.getUser();
                      if (user) {
                        const { error } = await supabase
                          .from('user_preferences')
                          .upsert({
                            id: user.id,
                            marketing_emails: !emailPreferences.marketing_emails,
                            class_reminders: emailPreferences.class_reminders,
                            email_notifications: emailPreferences.email_notifications,
                            interests: selectedCategories,
                            preferred_location: selectedLocations[0] === "Everywhere" ? null : selectedLocations[0]
                          });
                        
                        if (error) throw error;
                        
                        // Update the local state to reflect the change
                        if (userPreferences) {
                          userPreferences.marketing_emails = !emailPreferences.marketing_emails;
                        }
                        
                        toast({
                          title: "Preferences Updated",
                          description: `You have ${!emailPreferences.marketing_emails ? 'subscribed to' : 'unsubscribed from'} marketing emails.`,
                        });
                      }
                    } catch (error) {
                      console.error("Error updating email preferences:", error);
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to update preferences. Please try again.",
                      });
                    }
                  }}
                >
                  {emailPreferences.marketing_emails ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Class recommendations</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={async () => {
                    try {
                      const { data: { user } } = await supabase.auth.getUser();
                      if (user) {
                        const { error } = await supabase
                          .from('user_preferences')
                          .upsert({
                            id: user.id,
                            marketing_emails: emailPreferences.marketing_emails,
                            class_reminders: !emailPreferences.class_reminders,
                            email_notifications: emailPreferences.email_notifications,
                            interests: selectedCategories,
                            preferred_location: selectedLocations[0] === "Everywhere" ? null : selectedLocations[0]
                          });
                        
                        if (error) throw error;
                        
                        // Update the local state to reflect the change
                        if (userPreferences) {
                          userPreferences.class_reminders = !emailPreferences.class_reminders;
                        }
                        
                        toast({
                          title: "Preferences Updated",
                          description: `You have ${!emailPreferences.class_reminders ? 'subscribed to' : 'unsubscribed from'} class recommendations.`,
                        });
                      }
                    } catch (error) {
                      console.error("Error updating email preferences:", error);
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to update preferences. Please try again.",
                      });
                    }
                  }}
                >
                  {emailPreferences.class_reminders ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Instructor updates</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={async () => {
                    try {
                      const { data: { user } } = await supabase.auth.getUser();
                      if (user) {
                        const { error } = await supabase
                          .from('user_preferences')
                          .upsert({
                            id: user.id,
                            marketing_emails: emailPreferences.marketing_emails,
                            class_reminders: emailPreferences.class_reminders,
                            email_notifications: !emailPreferences.email_notifications,
                            interests: selectedCategories,
                            preferred_location: selectedLocations[0] === "Everywhere" ? null : selectedLocations[0]
                          });
                        
                        if (error) throw error;
                        
                        // Update the local state to reflect the change
                        if (userPreferences) {
                          userPreferences.email_notifications = !emailPreferences.email_notifications;
                        }
                        
                        toast({
                          title: "Preferences Updated",
                          description: `You have ${!emailPreferences.email_notifications ? 'subscribed to' : 'unsubscribed from'} instructor updates.`,
                        });
                      }
                    } catch (error) {
                      console.error("Error updating email preferences:", error);
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to update preferences. Please try again.",
                      });
                    }
                  }}
                >
                  {emailPreferences.email_notifications ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
