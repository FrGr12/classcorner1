
import { useState, useEffect } from "react";
import { ClassPreview } from "@/types/class";
import ClassCard from "@/components/landing/ClassCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const RecommendationSection = () => {
  const [recommendedClasses, setRecommendedClasses] = useState<ClassPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockRecommendations: ClassPreview[] = [
    {
      id: 101,
      title: "Ceramic Bowl Making",
      instructor: "Maya Johnson",
      price: 79,
      rating: 4.8,
      images: ["https://images.unsplash.com/photo-1493106641515-6b5631de4bb9"],
      level: "Beginner",
      date: new Date("2024-04-10"),
      city: "San Francisco",
      category: "Pottery",
      description: "Learn the basics of hand-building a beautiful ceramic bowl. Perfect for beginners wanting to get their hands dirty with clay."
    },
    {
      id: 102,
      title: "Natural Soap Making",
      instructor: "Daniel Green",
      price: 55,
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1624454002302-52288334e6af"],
      level: "Beginner",
      date: new Date("2024-04-15"),
      city: "Portland",
      category: "Crafts",
      description: "Create your own natural, handmade soaps using essential oils and botanical ingredients. Take home 3 beautiful bars to enjoy."
    },
    {
      id: 103,
      title: "Macramé Wall Hanging",
      instructor: "Olivia Knot",
      price: 65,
      rating: 4.7,
      images: ["https://images.unsplash.com/photo-1526304640581-d334cdbbf45e"],
      level: "Intermediate",
      date: new Date("2024-04-20"),
      city: "Austin",
      category: "Textile",
      description: "Learn various macramé knots and techniques to create a beautiful wall hanging. This workshop is perfect for those with some basic crafting experience."
    },
    {
      id: 104,
      title: "Italian Pasta Making",
      instructor: "Marco Rossi",
      price: 85,
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1556760544-74068565f05c"],
      level: "Beginner",
      date: new Date("2024-04-12"),
      city: "Chicago",
      category: "Cooking",
      description: "Learn authentic Italian techniques for making fresh pasta from scratch. You'll create three different pasta shapes and classic sauces."
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecommendedClasses(mockRecommendations);
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Recommended for You</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse h-64 bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">Recommended for You</h3>
        <Button variant="ghost" className="text-primary flex items-center gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedClasses.map((classItem) => (
          <ClassCard key={classItem.id} {...classItem} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
