
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { categories } from "../constants";
import { getAllClassTitles } from "../utils";

export const useSearchLogic = () => {
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Everywhere"]);
  const [selectedTime, setSelectedTime] = useState<string>("Any week");
  const [matchingCategories, setMatchingCategories] = useState<string[]>([]);
  const [matchingTitles, setMatchingTitles] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState<{interests: string[], preferred_location: string | null}>();
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('interests, preferred_location')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setUserPreferences(data);
        if (data.interests?.length > 0) {
          setSelectedCategories(data.interests);
        }
        if (data.preferred_location) {
          setSelectedLocations([data.preferred_location]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching preferences:", error);
    } finally {
      setIsLoadingPreferences(false);
    }
  };

  useEffect(() => {
    if (searchInput) {
      const categoryMatches = categories.filter(category => 
        category.toLowerCase().includes(searchInput.toLowerCase())
      );
      setMatchingCategories(categoryMatches);
      
      const titleMatches = getAllClassTitles().filter(title =>
        title.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5);
      setMatchingTitles(titleMatches);
    } else {
      setMatchingCategories([]);
      setMatchingTitles([]);
    }
  }, [searchInput]);

  const updatePreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            id: user.id,
            interests: selectedCategories,
            preferred_location: selectedLocations[0] === "Everywhere" ? null : selectedLocations[0]
          });

        if (error) throw error;

        toast({
          title: "Preferences Updated",
          description: "Your search preferences have been saved for better recommendations.",
        });
      }
    } catch (error: any) {
      console.error("Error updating preferences:", error);
    }
  };

  return {
    searchInput,
    setSearchInput,
    selectedCategories,
    setSelectedCategories,
    selectedLocations,
    setSelectedLocations,
    selectedTime,
    matchingCategories,
    matchingTitles,
    userPreferences,
    isLoadingPreferences,
    updatePreferences
  };
};
