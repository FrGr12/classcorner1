
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const TeacherSettings = () => {
  const [autoPromote, setAutoPromote] = useState(false);
  const [autoNotify, setAutoNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: courses, error } = await supabase
        .from('courses')
        .select('auto_promote_from_waitlist, auto_send_waitlist_notification')
        .eq('instructor_id', user.id)
        .single();

      if (error) throw error;

      if (courses) {
        setAutoPromote(courses.auto_promote_from_waitlist || false);
        setAutoNotify(courses.auto_send_waitlist_notification || false);
      }
    } catch (error: any) {
      console.error('Error loading settings:', error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const updateWaitlistSettings = async (setting: 'auto_promote_from_waitlist' | 'auto_send_waitlist_notification', value: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('courses')
        .update({ [setting]: value })
        .eq('instructor_id', user.id);

      if (error) throw error;

      toast.success("Settings updated successfully");
    } catch (error: any) {
      console.error('Error updating settings:', error);
      toast.error("Failed to update settings");
    }
  };

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="booking-notifications">Booking Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new bookings
              </p>
            </div>
            <Switch id="booking-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="message-notifications">Message Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new messages
              </p>
            </div>
            <Switch id="message-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="review-notifications">Review Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new reviews
              </p>
            </div>
            <Switch id="review-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waitlist Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-promote">Automatic Promotion</Label>
              <p className="text-sm text-muted-foreground">
                Automatically promote people from the waitlist when a spot becomes available
              </p>
            </div>
            <Switch 
              id="auto-promote" 
              checked={autoPromote}
              onCheckedChange={(checked) => {
                setAutoPromote(checked);
                updateWaitlistSettings('auto_promote_from_waitlist', checked);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-notify">Automatic Notification</Label>
              <p className="text-sm text-muted-foreground">
                Automatically notify waitlisted people when someone declines participation
              </p>
            </div>
            <Switch 
              id="auto-notify" 
              checked={autoNotify}
              onCheckedChange={(checked) => {
                setAutoNotify(checked);
                updateWaitlistSettings('auto_send_waitlist_notification', checked);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="destructive"
            onClick={() => toast.error("This feature is not yet implemented")}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherSettings;
