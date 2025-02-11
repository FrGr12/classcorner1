
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
  Link as LinkIcon,
  Instagram,
  Globe,
} from "lucide-react";

interface TeacherProfileData {
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
  portfolio_url: string;
  social_media: {
    linkedin: string;
    instagram: string;
    website: string;
  };
  email_notifications: boolean;
  sms_notifications: boolean;
}

const TeacherProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<TeacherProfileData>({
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
    portfolio_url: "",
    social_media: {
      linkedin: "",
      instagram: "",
      website: ""
    },
    email_notifications: true,
    sms_notifications: false
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
        const socialMedia = typeof data.social_media === 'object' && data.social_media !== null
          ? {
              linkedin: (data.social_media as any)?.linkedin || "",
              instagram: (data.social_media as any)?.instagram || "",
              website: (data.social_media as any)?.website || ""
            }
          : {
              linkedin: "",
              instagram: "",
              website: ""
            };

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
          portfolio_url: data.portfolio_url || "",
          social_media: socialMedia,
          email_notifications: true,
          sms_notifications: false
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
          first_name: profile.first_name,
          last_name: profile.last_name,
          bio: profile.bio,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          languages: profile.languages,
          teaching_experience: profile.teaching_experience,
          timezone: profile.timezone,
          expertise: profile.expertise,
          preferred_teaching_method: profile.preferred_teaching_method,
          portfolio_url: profile.portfolio_url,
          social_media: profile.social_media
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
    <div className="space-y-6 text-left">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-semibold">Teacher Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your teaching profile and settings
            </p>
          </div>
          
          <Button 
            onClick={handleUpdateProfile}
            className="bg-[#6E44FF] hover:bg-[#5835CC] text-white"
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-left">Personal Information</CardTitle>
          <CardDescription className="text-left">
            Your public profile information visible to students
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 rounded-full bg-neutral-100 overflow-hidden">
              <div className="flex h-full items-center justify-center">
                <User className="h-8 w-8 text-neutral-400" />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
              <p className="text-sm text-muted-foreground">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-left">First Name</Label>
              <Input
                value={profile.first_name}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-left">Last Name</Label>
              <Input
                value={profile.last_name}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                className="bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-left">Bio</Label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell students about yourself and your teaching experience..."
              className="min-h-[100px] bg-white"
            />
            <p className="text-sm text-muted-foreground text-left">
              A brief introduction about yourself and your teaching style
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-left">Teaching Profile</CardTitle>
          <CardDescription className="text-left">
            Showcase your expertise and qualifications
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-left">
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
            <Label className="flex items-center gap-2 text-left">
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
            <Label className="flex items-center gap-2 text-left">
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
        </CardContent>
      </Card>

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-left">Online Presence</CardTitle>
          <CardDescription className="text-left">
            Your social media and online portfolio links
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-left">
              <LinkIcon className="h-4 w-4 text-neutral-400" />
              LinkedIn Profile
            </Label>
            <Input
              value={profile.social_media.linkedin}
              onChange={(e) => setProfile({ 
                ...profile, 
                social_media: { ...profile.social_media, linkedin: e.target.value }
              })}
              placeholder="https://linkedin.com/in/your-profile"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-left">
              <Instagram className="h-4 w-4 text-neutral-400" />
              Instagram Profile
            </Label>
            <Input
              value={profile.social_media.instagram}
              onChange={(e) => setProfile({ 
                ...profile, 
                social_media: { ...profile.social_media, instagram: e.target.value }
              })}
              placeholder="https://instagram.com/your-profile"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-left">
              <Globe className="h-4 w-4 text-neutral-400" />
              Personal Website
            </Label>
            <Input
              value={profile.social_media.website}
              onChange={(e) => setProfile({ 
                ...profile, 
                social_media: { ...profile.social_media, website: e.target.value }
              })}
              placeholder="https://your-website.com"
              className="bg-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-left">Contact Information</CardTitle>
          <CardDescription className="text-left">
            How students and the platform can reach you
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-left">
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
              <Label className="flex items-center gap-2 text-left">
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
            <Label className="flex items-center gap-2 text-left">
              <MapPin className="h-4 w-4 text-neutral-400" />
              Location
            </Label>
            <Input
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="City, Country"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-left">
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
          <CardTitle className="text-left">Notification Preferences</CardTitle>
          <CardDescription className="text-left">
            Manage how you receive updates about your classes and students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-left">Email Notifications</Label>
              <p className="text-sm text-muted-foreground text-left">
                Receive updates about bookings and student messages
              </p>
            </div>
            <Switch
              checked={profile.email_notifications}
              onCheckedChange={(checked) => 
                setProfile({ ...profile, email_notifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-left">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground text-left">
                Get instant notifications for urgent updates
              </p>
            </div>
            <Switch
              checked={profile.sms_notifications}
              onCheckedChange={(checked) => 
                setProfile({ ...profile, sms_notifications: checked })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherProfile;
