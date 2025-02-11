
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Languages,
  Clock,
  BookOpen,
  BellRing,
  CreditCard,
  Palette,
} from "lucide-react";

interface ProfileData {
  first_name: string;
  last_name: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  languages: string[];
  teaching_experience: string;
  timezone: string;
  expertise: string[];
  preferred_teaching_method: string;
  hourly_rate: string;
  portfolio_url: string;
  social_media: {
    linkedin: string;
    instagram: string;
  };
}

const UserProfileDuplicate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    languages: [],
    teaching_experience: "",
    timezone: "",
    expertise: [],
    preferred_teaching_method: "in-person",
    hourly_rate: "",
    portfolio_url: "",
    social_media: {
      linkedin: "",
      instagram: ""
    }
  });
  const { toast } = useToast();

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
          bio: data.bio || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          languages: data.languages || [],
          teaching_experience: data.teaching_experience || "",
          timezone: data.timezone || "",
          expertise: data.expertise || [],
          preferred_teaching_method: data.preferred_teaching_method || "in-person",
          hourly_rate: data.hourly_rate?.toString() || "",
          portfolio_url: data.portfolio_url || "",
          social_media: data.social_media || { linkedin: "", instagram: "" }
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

  const handleUpdateProfile = async () => {
    try {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          ...profile,
          hourly_rate: profile.hourly_rate ? parseFloat(profile.hourly_rate) : null
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-semibold">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your teacher profile and preferences
            </p>
          </div>
          
          <Button 
            onClick={handleUpdateProfile}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and public profile
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
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

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell students about yourself and your teaching experience..."
              className="min-h-[100px] bg-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle>Teaching Profile</CardTitle>
          <CardDescription>
            Showcase your expertise and teaching style
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-neutral-400" />
              Teaching Experience
            </Label>
            <Textarea
              value={profile.teaching_experience}
              onChange={(e) => setProfile({ ...profile, teaching_experience: e.target.value })}
              placeholder="Describe your teaching experience and qualifications..."
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-neutral-400" />
              Areas of Expertise
            </Label>
            <Input
              value={profile.expertise.join(", ")}
              onChange={(e) => setProfile({ ...profile, expertise: e.target.value.split(",").map(item => item.trim()) })}
              placeholder="e.g., Painting, Drawing, Sculpture"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-neutral-400" />
              Languages Spoken
            </Label>
            <Input
              value={profile.languages.join(", ")}
              onChange={(e) => setProfile({ ...profile, languages: e.target.value.split(",").map(item => item.trim()) })}
              placeholder="e.g., English, Spanish"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-neutral-400" />
              Hourly Rate
            </Label>
            <Input
              type="number"
              value={profile.hourly_rate}
              onChange={(e) => setProfile({ ...profile, hourly_rate: e.target.value })}
              placeholder="Your standard hourly rate"
              className="bg-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How students and the platform can reach you
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
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

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-neutral-400" />
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

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how you receive updates and communications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="booking-notifications">New Booking Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when students book your classes
              </p>
            </div>
            <Switch id="booking-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="message-notifications">Message Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new student messages
              </p>
            </div>
            <Switch id="message-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="review-notifications">Review Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when students leave reviews
              </p>
            </div>
            <Switch id="review-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminder-notifications">Class Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders before your scheduled classes
              </p>
            </div>
            <Switch id="reminder-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileDuplicate;
