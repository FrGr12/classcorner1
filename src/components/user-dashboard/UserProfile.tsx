
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  AtSign
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const UserProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    timezone: "",
    account_type: "",
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
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || "",
          timezone: data.timezone || "",
          account_type: data.account_type || "student",
        });
      }
    } catch (error: any) {
      toast.error("Error loading profile");
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and preferences
            </p>
          </div>
          
          <Button 
            onClick={handleSave}
            className="bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white"
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Account Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Account Information</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center">
                <User className="h-8 w-8 text-neutral-400" />
              </div>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4" />
                <span>Account Type: {profile.account_type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Member since: {new Date().getFullYear()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <AtSign className="h-4 w-4 text-neutral-400" />
                Username
              </Label>
              <Input
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="bg-white"
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-neutral-400" />
                Email Address
              </Label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                type="email"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-neutral-400" />
                Phone Number
              </Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                type="tel"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-neutral-400" />
                Location
              </Label>
              <Input
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-neutral-400" />
                Timezone
              </Label>
              <Select 
                value={profile.timezone} 
                onValueChange={(value) => setProfile({ ...profile, timezone: value })}
              >
                <SelectTrigger className="bg-white">
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
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  value={profile.first_name}
                  onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  value={profile.last_name}
                  onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="min-h-[100px] bg-white"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
