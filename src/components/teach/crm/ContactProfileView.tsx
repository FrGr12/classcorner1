import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Mail, Phone, Clock, Tag, X } from "lucide-react";

interface ContactProfileViewProps {
  contactId: string;
  onClose: () => void;
}

const ContactProfileView = ({ contactId, onClose }: ContactProfileViewProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, [contactId]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          bookings (
            id,
            course:courses(title),
            created_at,
            status
          ),
          communications (
            id,
            message_content,
            sent_at,
            status
          )
        `)
        .eq("id", contactId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", contactId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      fetchProfile();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                value={profile?.first_name || ""}
                onChange={(e) =>
                  updateProfile({ first_name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={profile?.last_name || ""}
                onChange={(e) =>
                  updateProfile({ last_name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.email}</span>
              </div>
            </div>
            <div>
              <Label>Phone</Label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.phone || "Not provided"}</span>
              </div>
            </div>
          </div>

          <div>
            <Label>Preferred Contact Method</Label>
            <Select
              value={profile?.preferred_contact_method || ""}
              onValueChange={(value) =>
                updateProfile({ preferred_contact_method: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={profile?.notes || ""}
              onChange={(e) => updateProfile({ notes: e.target.value })}
              placeholder="Add notes about this contact..."
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile?.tags?.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    onClick={() =>
                      updateProfile({
                        tags: profile.tags.filter((t: string) => t !== tag),
                      })
                    }
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile?.bookings?.map((booking: any) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{booking.course?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(booking.created_at), "PPp")}
                  </p>
                </div>
                <Badge>{booking.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile?.communications?.map((comm: any) => (
              <div
                key={comm.id}
                className="p-4 border rounded-lg"
              >
                <p className="text-sm text-muted-foreground">
                  {format(new Date(comm.sent_at), "PPp")}
                </p>
                <p className="mt-2">{comm.message_content}</p>
                <Badge variant="outline" className="mt-2">
                  {comm.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactProfileView;