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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Upload, Save } from "lucide-react";
import ImageUpload from "../ImageUpload";

const TeacherProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
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
      setProfile(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching profile",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update(profile)
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
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal information and teaching preferences
          </p>
        </div>
        <Button onClick={handleUpdateProfile} className="gap-2">
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
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-neutral-100 text-neutral-500">
                      <Upload className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={profile?.first_name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, first_name: e.target.value })
                }
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={profile?.last_name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, last_name: e.target.value })
                }
                placeholder="Enter your last name"
              />
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={profile?.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell students about yourself..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location & Gallery</CardTitle>
            <CardDescription>
              Manage your teaching locations and showcase your work
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Teaching Location</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your teaching location"
                  value={profile?.location || ""}
                  onChange={(e) => 
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gallery</Label>
              <ImageUpload 
                images={images} 
                setImages={setImages}
                className="min-h-[200px] bg-neutral-50"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;