
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSearchLogic } from "@/components/landing/search/hooks/useSearchLogic";
import MatchPreferencesForm from "./matches/MatchPreferencesForm";
import { LoadingState } from "./LoadingState";

interface UserPreferencesType {
  interests: string[];
  preferred_location: string | null;
  marketing_emails?: boolean;
  class_reminders?: boolean;
  email_notifications?: boolean;
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

  const handleEnableMatching = (location: string, categories: string[]) => {
    setSelectedLocations([location]);
    setSelectedCategories(categories);
    handleSavePreferences();
  };

  if (isLoadingPreferences) {
    return <LoadingState />;
  }

  // Default values for email preferences when they don't exist in the data
  const emailPreferences = userPreferences as UserPreferencesType || {
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
          Manage your preferences for class recommendations and notifications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
                <Button variant="outline" size="sm">
                  {emailPreferences.marketing_emails ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Class recommendations</span>
                <Button variant="outline" size="sm">
                  {emailPreferences.class_reminders ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Instructor updates</span>
                <Button variant="outline" size="sm">
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
