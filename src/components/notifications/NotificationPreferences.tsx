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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface NotificationSettings {
  id: string;
  email_reminders: boolean;
  sms_reminders: boolean;
  phone_number: string | null;
  reminder_hours: number[];
}

const NotificationPreferences = () => {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("notification_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      setSettings(data || {
        id: user.id,
        email_reminders: true,
        sms_reminders: false,
        phone_number: null,
        reminder_hours: [24, 2]
      });
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
    if (!settings) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("notification_settings")
        .upsert({
          user_id: settings.id,
          email_reminders: settings.email_reminders,
          sms_reminders: settings.sms_reminders,
          phone_number: settings.phone_number,
          reminder_hours: settings.reminder_hours
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your notification preferences have been saved.",
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose how and when you want to be notified about your upcoming classes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive class reminders via email
              </p>
            </div>
            <Switch
              checked={settings?.email_reminders}
              onCheckedChange={(checked) =>
                setSettings(prev => prev ? { ...prev, email_reminders: checked } : null)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive class reminders via SMS
              </p>
            </div>
            <Switch
              checked={settings?.sms_reminders}
              onCheckedChange={(checked) =>
                setSettings(prev => prev ? { ...prev, sms_reminders: checked } : null)
              }
            />
          </div>

          {settings?.sms_reminders && (
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="+1234567890"
                value={settings.phone_number || ""}
                onChange={(e) =>
                  setSettings(prev =>
                    prev ? { ...prev, phone_number: e.target.value } : null
                  )
                }
              />
              <p className="text-sm text-muted-foreground">
                Enter your phone number to receive SMS notifications
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferences;