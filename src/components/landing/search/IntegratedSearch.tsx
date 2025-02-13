
import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, X, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterButtons from "../filters/FilterButtons";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mockClasses } from "@/data/mockClasses";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Define categories for smart search
const categories = [
  "Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making",
  "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance",
  "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"
];

const IntegratedSearch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Everywhere"]);
  const [selectedTime, setSelectedTime] = useState<string>("Any week");
  const [isOpen, setIsOpen] = useState(false);
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
      // Match categories
      const categoryMatches = categories.filter(category => 
        category.toLowerCase().includes(searchInput.toLowerCase())
      );
      setMatchingCategories(categoryMatches);
      
      // Match titles
      const titleMatches = getAllClassTitles().filter(title =>
        title.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5); // Limit to 5 title suggestions
      setMatchingTitles(titleMatches);
    } else {
      setMatchingCategories([]);
      setMatchingTitles([]);
    }
  }, [searchInput]);

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("q", searchInput);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedLocations.length > 0 && !selectedLocations.includes("Everywhere")) {
      params.set("locations", selectedLocations.join(","));
    }
    if (selectedTime !== "Any week") params.set("time", selectedTime);

    // Update user preferences if logged in
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
    
    navigate(`/browse?${params.toString()}`);
    setIsOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (matchingCategories.length === 1) {
        setSelectedCategories([matchingCategories[0]]);
      }
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl ml-4">
      {/* Mobile View */}
      <div className="md:hidden w-full">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="w-full">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <Search className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">Search classes...</span>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-lg font-semibold">Search Classes</SheetTitle>
            </SheetHeader>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for classes..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  className="w-full pl-10 py-6 text-base"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                {!isLoadingPreferences && userPreferences?.interests?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-neutral-600 mb-2">Your Interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {userPreferences.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="gap-1">
                          <Star className="w-3 h-3" />
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {(matchingCategories.length > 0 || matchingTitles.length > 0) && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {matchingCategories.map((category) => (
                      <div
                        key={category}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedCategories([category]);
                          setSearchInput(category);
                          handleSearch();
                        }}
                      >
                        <span className="text-accent-purple">Category:</span> {category}
                      </div>
                    ))}
                    {matchingTitles.map((title) => (
                      <div
                        key={title}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSearchInput(title);
                          handleSearch();
                        }}
                      >
                        <span className="text-accent-purple">Class:</span> {title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <FilterButtons
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedLocations={selectedLocations}
                selectedTime={selectedTime}
                setOpen={() => {}}
                setSelectedLocations={setSelectedLocations}
              />

              <button
                onClick={handleSearch}
                className="w-full py-3 bg-accent-rose text-accent-purple rounded-xl font-medium hover:bg-accent-rose/90 transition-colors"
              >
                Search
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full">
        <div className="glass-panel rounded-full flex items-center divide-x divide-neutral-200 p-2">
          <div className="flex-1 px-4 py-2 relative">
            <Input
              type="text"
              placeholder="Search for classes..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="border-0 bg-transparent focus-visible:ring-0 px-0 py-0 h-auto placeholder:text-neutral-500"
            />
            {!isLoadingPreferences && userPreferences?.interests?.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-50">
                <p className="text-sm text-neutral-600 mb-2">Your Interests:</p>
                <div className="flex flex-wrap gap-2">
                  {userPreferences.interests.map(interest => (
                    <Badge key={interest} variant="secondary" className="gap-1">
                      <Star className="w-3 h-3" />
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {(matchingCategories.length > 0 || matchingTitles.length > 0) && (
              <div className="absolute z-10 w-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                {matchingCategories.map((category) => (
                  <div
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategories([category]);
                      setSearchInput(category);
                      handleSearch();
                    }}
                  >
                    <span className="text-accent-purple">Category:</span> {category}
                  </div>
                ))}
                {matchingTitles.map((title) => (
                  <div
                    key={title}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchInput(title);
                      handleSearch();
                    }}
                  >
                    <span className="text-accent-purple">Class:</span> {title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FilterButtons
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedLocations={selectedLocations}
            selectedTime={selectedTime}
            setOpen={() => {}}
            setSelectedLocations={setSelectedLocations}
          />

          <button 
            onClick={handleSearch}
            className="ml-2 p-3 bg-accent-purple text-white rounded-full hover:bg-accent-lavender transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const getAllClassTitles = () => {
  const titles: string[] = [];
  Object.values(mockClasses).forEach(classes => {
    classes.forEach(classItem => {
      titles.push(classItem.title);
    });
  });
  return [...new Set(titles)]; // Remove duplicates
};

export default IntegratedSearch;
