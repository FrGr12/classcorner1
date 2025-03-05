
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserType } from "@/types/user";

export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  bio: string;
  phone: string;
  userType: UserType;
  interests: string[];
}

export const useOnboardingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<OnboardingFormData>({
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
    userType: "student" as UserType,
    interests: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setProfile(profile);
          setFormData({
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            bio: profile.bio || "",
            phone: profile.phone || "",
            userType: profile.user_type || "student",
            interests: [],
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          bio: formData.bio,
          phone: formData.phone,
          user_type: formData.userType,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Create user preferences
      const { error: prefError } = await supabase
        .from("user_preferences")
        .upsert({
          id: user.id,
          interests: formData.interests,
          updated_at: new Date().toISOString(),
        });

      if (prefError) throw prefError;

      // Update onboarding steps
      const { error: onboardingError } = await supabase
        .from("onboarding_steps")
        .upsert({
          user_id: user.id,
          preferences_completed: true,
          location_completed: true,
          interests_completed: formData.interests.length > 0,
        });

      if (onboardingError) throw onboardingError;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      // Redirect based on user type
      navigate(formData.userType === "teacher" ? "/teach" : "/browse");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    loading,
    submitting,
    formData,
    setFormData,
    handleSubmit
  };
};
