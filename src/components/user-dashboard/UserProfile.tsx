
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  Clock,
  BadgeCheck,
  BellRing,
  AtSign
} from "lucide-react";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  timezone: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  class_reminders: boolean;
  marketing_emails: boolean;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
}

const UserProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    timezone: "",
    email_notifications: true,
    sms_notifications: false,
    class_reminders: true,
    marketing_emails: false,
    created_at: "",
    updated_at: "",
    avatar_url: null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          id: data.id,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || "",
          timezone: data.timezone || "",
          email_notifications: data.email_notifications ?? true,
          sms_notifications: data.sms_notifications ?? false,
          class_reminders: data.class_reminders ?? true,
          marketing_emails: data.marketing_emails ?? false,
          created_at: data.created_at || "",
          updated_at: data.updated_at || "",
          avatar_url: data.avatar_url
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: error.message,
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          bio: profile.bio,
          timezone: profile.timezone,
          email_notifications: profile.email_notifications,
          sms_notifications: profile.sms_notifications,
          class_reminders: profile.class_reminders,
          marketing_emails: profile.marketing_emails,
        })
        .eq('id', user.id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile & Preferences</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal information, preferences, and account settings
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-[#6E44FF] hover:bg-[#6E44FF]/90" disabled={isSubmitting}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and public profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="flex h-full items-center justify-center">
                    <User className="h-8 w-8 text-neutral-400" />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  value={profile.first_name}
                  onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  value={profile.last_name}
                  onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <AtSign className="h-4 w-4" />
                Username
              </Label>
              <Input
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Update your contact details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                type="tel"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timezone
              </Label>
              <Select 
                value={profile.timezone} 
                onValueChange={(value) => setProfile({ ...profile, timezone: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (PT)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (ET)</SelectItem>
                  <SelectItem value="UTC+0">Greenwich Mean Time (GMT)</SelectItem>
                  <SelectItem value="UTC+1">Central European Time (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive class updates via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={profile.email_notifications}
                onCheckedChange={(checked) =>
                  setProfile({ ...profile, email_notifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get instant updates via SMS
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={profile.sms_notifications}
                onCheckedChange={(checked) =>
                  setProfile({ ...profile, sms_notifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="class-reminders">Class Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Receive reminders before your classes
                </p>
              </div>
              <Switch
                id="class-reminders"
                checked={profile.class_reminders}
                onCheckedChange={(checked) =>
                  setProfile({ ...profile, class_reminders: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails">Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new classes and promotions
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={profile.marketing_emails}
                onCheckedChange={(checked) =>
                  setProfile({ ...profile, marketing_emails: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>View your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#6E44FF]" />
              <span className="text-sm">Student Account</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#6E44FF]" />
              <span className="text-sm">Member since {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-2">
              <BellRing className="h-4 w-4 text-[#6E44FF]" />
              <span className="text-sm">Notifications Active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
