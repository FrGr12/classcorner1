
import { useState, useEffect } from "react";
import CategoryPills from "./filters/CategoryPills";
import ClassGrid from "./ClassGrid";
import { 
  Amphora, 
  ChefHat, 
  Cookie, 
  Palette, 
  Wine, 
  Camera, 
  Music2, 
  Flame, 
  Axe, 
  Pencil, 
  Scissors, 
  FileText,
  Flower2,
  Sparkles,
  Clock,
  MapPin,
  Trophy,
  Timer,
  Snowflake,
  GraduationCap,
  BookOpen,
  Users
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { name: "Pottery", count: "95+ Classes", icon: Amphora },
  { name: "Cooking", count: "200+ Classes", icon: ChefHat },
  { name: "Baking", count: "85+ Classes", icon: Cookie },
  { name: "Painting & Art", count: "120+ Classes", icon: Palette },
  { name: "Candle Making", count: "45+ Classes", icon: Flame },
  { name: "Jewellery & Metal", count: "90+ Classes", icon: Pencil },
  { name: "Cocktail & Wine", count: "60+ Classes", icon: Wine },
  { name: "Photography", count: "80+ Classes", icon: Camera },
  { name: "Music & Dance", count: "150+ Classes", icon: Music2 },
  { name: "Wood Craft", count: "75+ Classes", icon: Axe },
  { name: "Textile Craft", count: "110+ Classes", icon: Scissors },
  { name: "Paper Craft", count: "40+ Classes", icon: FileText },
  { name: "Flower & Plants", count: "70+ Classes", icon: Flower2 },
];

const crossFunctionalIcons = {
  recommended: Sparkles,
  recently_added: Clock,
  popular_nearby: MapPin,
  top_rated: Trophy,
  last_minute_deal: Timer,
  seasonal_special: Snowflake,
  beginner_friendly: GraduationCap,
  advanced_course: BookOpen,
  family_friendly: Users
};

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [crossFunctionalCategories, setCrossFunctionalCategories] = useState<{ name: string, count: string, icon: any }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCrossFunctionalCategories = async () => {
      const { data, error } = await supabase
        .from('course_category_assignments')
        .select(`
          category,
          courses!inner(*)
        `)
        .eq('courses.status', 'published');

      if (error) {
        console.error('Error fetching cross-functional categories:', error);
        return;
      }

      // Group and count courses by category
      const categoryCounts = data.reduce((acc: { [key: string]: number }, curr) => {
        const category = curr.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      // Format categories for display
      const formattedCategories = Object.entries(categoryCounts).map(([category, count]) => ({
        name: category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        count: `${count} Classes`,
        icon: crossFunctionalIcons[category as keyof typeof crossFunctionalIcons]
      }));

      setCrossFunctionalCategories(formattedCategories);
    };

    fetchCrossFunctionalCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const allCategories = [
    ...crossFunctionalCategories,
    ...categories
  ];

  return (
    <section className="pt-4 sm:pt-6 md:pt-8 bg-neutral-100 w-full">
      <div className="px-2 sm:px-3 md:px-6 lg:px-8">
        <div className="mt-4 sm:mt-6 md:mt-8 text-neutral-600">
          {/* Category Pills with improved mobile scrolling */}
          <div className="overflow-x-auto scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0">
            <div className="inline-flex sm:flex w-auto sm:w-full">
              <CategoryPills
                categories={allCategories}
                selectedCategories={selectedCategories}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-12">
          {/* Adjusted grid spacing for mobile */}
          <div className="max-w-[1920px] mx-auto">
            <ClassGrid 
              category={selectedCategories.length === 1 ? selectedCategories[0] : null}
              sortBy="recommended"
              priceRange={[0, 200]}
              minRating={0}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Add mobile-specific styles */}
      <style>{`
        @media (max-width: 640px) {
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Categories;
