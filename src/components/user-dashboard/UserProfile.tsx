import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, User, Mail, Phone, MapPin, Save, Clock, BadgeCheck, BellRing, AtSign } from "lucide-react";
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
  const {
    toast
  } = useToast();
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
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data,
        error
      } = await supabase.from('profiles').select('*').eq('id', user.id).single();
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
        description: error.message
      });
    }
  };
  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        error
      } = await supabase.from('profiles').update({
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
        marketing_emails: profile.marketing_emails
      }).eq('id', user.id);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Your profile has been updated."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-left">Profile & Preferences</h1>
          
        </div>
        <Button onClick={handleSave} className="gap-1 sm:gap-2 bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-xs sm:text-sm h-8 sm:h-auto py-1.5 sm:py-2 px-2 sm:px-4" disabled={isSubmitting}>
          <Save className="h-3 w-3 sm:h-4 sm:w-4" />
          Save
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-xl text-left">Personal Information</CardTitle>
            
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm">Profile Photo</Label>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="flex h-full items-center justify-center">
                    <User className="h-6 w-6 sm:h-8 sm:w-8 text-neutral-400" />
                  </div>
                </div>
                <Button variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm h-8 sm:h-auto py-1 sm:py-2 px-2 sm:px-3">
                  <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-xs sm:text-sm">First Name</Label>
                <Input value={profile.first_name} onChange={e => setProfile({
                ...profile,
                first_name: e.target.value
              })} className="h-8 sm:h-10 text-xs sm:text-base" />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-xs sm:text-sm">Last Name</Label>
                <Input value={profile.last_name} onChange={e => setProfile({
                ...profile,
                last_name: e.target.value
              })} className="h-8 sm:h-10 text-xs sm:text-base" />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <AtSign className="h-3 w-3 sm:h-4 sm:w-4" />
                Username
              </Label>
              <Input value={profile.username} onChange={e => setProfile({
              ...profile,
              username: e.target.value
            })} className="h-8 sm:h-10 text-xs sm:text-base" />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label className="text-xs sm:text-sm">Bio</Label>
              <Textarea value={profile.bio} onChange={e => setProfile({
              ...profile,
              bio: e.target.value
            })} placeholder="Tell us about yourself..." className="min-h-[60px] sm:min-h-[100px] text-xs sm:text-base py-1.5 sm:py-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-xl text-left">Contact Information</CardTitle>
            
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <Label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                Email Address
              </Label>
              <Input value={profile.email} onChange={e => setProfile({
              ...profile,
              email: e.target.value
            })} type="email" className="h-8 sm:h-10 text-xs sm:text-base" />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                Phone Number
              </Label>
              <Input value={profile.phone} onChange={e => setProfile({
              ...profile,
              phone: e.target.value
            })} type="tel" className="h-8 sm:h-10 text-xs sm:text-base" />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                Location
              </Label>
              <Input value={profile.location} onChange={e => setProfile({
              ...profile,
              location: e.target.value
            })} className="h-8 sm:h-10 text-xs sm:text-base" />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                Timezone
              </Label>
              <Select value={profile.timezone} onValueChange={value => setProfile({
              ...profile,
              timezone: value
            })}>
                <SelectTrigger className="h-8 sm:h-10 text-xs sm:text-base">
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8" className="text-xs sm:text-sm">Pacific Time (PT)</SelectItem>
                  <SelectItem value="UTC-5" className="text-xs sm:text-sm">Eastern Time (ET)</SelectItem>
                  <SelectItem value="UTC+0" className="text-xs sm:text-sm">Greenwich Mean Time (GMT)</SelectItem>
                  <SelectItem value="UTC+1" className="text-xs sm:text-sm">Central European Time (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-xl text-left">Notification Settings</CardTitle>
            
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-xs sm:text-sm">Email Notifications</Label>
                <p className="text-[9px] sm:text-sm text-muted-foreground">
                  Receive class updates via email
                </p>
              </div>
              <Switch id="email-notifications" checked={profile.email_notifications} onCheckedChange={checked => setProfile({
              ...profile,
              email_notifications: checked
            })} className="h-4 w-7 sm:h-5 sm:w-10" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications" className="text-xs sm:text-sm">SMS Notifications</Label>
                <p className="text-[9px] sm:text-sm text-muted-foreground">
                  Get instant updates via SMS
                </p>
              </div>
              <Switch id="sms-notifications" checked={profile.sms_notifications} onCheckedChange={checked => setProfile({
              ...profile,
              sms_notifications: checked
            })} className="h-4 w-7 sm:h-5 sm:w-10" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="class-reminders" className="text-xs sm:text-sm">Class Reminders</Label>
                <p className="text-[9px] sm:text-sm text-muted-foreground">
                  Receive reminders before your classes
                </p>
              </div>
              <Switch id="class-reminders" checked={profile.class_reminders} onCheckedChange={checked => setProfile({
              ...profile,
              class_reminders: checked
            })} className="h-4 w-7 sm:h-5 sm:w-10" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails" className="text-xs sm:text-sm">Marketing Communications</Label>
                <p className="text-[9px] sm:text-sm text-muted-foreground">
                  Receive updates about new classes and promotions
                </p>
              </div>
              <Switch id="marketing-emails" checked={profile.marketing_emails} onCheckedChange={checked => setProfile({
              ...profile,
              marketing_emails: checked
            })} className="h-4 w-7 sm:h-5 sm:w-10" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none sm:rounded-md border-x-0 sm:border-x">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-xl text-left">Account Status</CardTitle>
            
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <BadgeCheck className="h-3 w-3 sm:h-4 sm:w-4 text-[#6E44FF]" />
              <span className="text-[10px] sm:text-sm">Student Account</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-[#6E44FF]" />
              <span className="text-[10px] sm:text-sm">Member since {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <BellRing className="h-3 w-3 sm:h-4 sm:w-4 text-[#6E44FF]" />
              <span className="text-[10px] sm:text-sm">Notifications Active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default UserProfile;