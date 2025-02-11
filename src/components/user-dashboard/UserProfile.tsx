
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User, Mail, Phone, MapPin, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const UserProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
  });

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
    <div className="space-y-8">
      {/* Header Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-semibold">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and preferences
            </p>
          </div>
          
          <Button 
            onClick={handleSave}
            className="bg-accent-purple hover:bg-accent-purple/90 text-white"
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-left">Basic Information</h2>
        
        <div className="space-y-6">
          {/* Profile Photo */}
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

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
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

          {/* Bio */}
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

      {/* Contact Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-left">Contact Information</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-neutral-400" />
                Email
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
                Phone
              </Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                type="tel"
                className="bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-neutral-400" />
              Location
            </Label>
            <Input
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Enter your location"
              className="bg-white"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
