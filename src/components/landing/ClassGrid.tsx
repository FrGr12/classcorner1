import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for classes - in a real app, this would come from an API
const mockClasses = {
  Ceramics: [
    { id: 1, title: "Introduction to Pottery", instructor: "Jane Smith", price: 89, rating: 4.8, image: "/placeholder.svg", level: "Beginner" },
    { id: 2, title: "Wheel Throwing Basics", instructor: "Mike Johnson", price: 99, rating: 4.7, image: "/placeholder.svg", level: "Beginner" },
    { id: 3, title: "Advanced Ceramic Sculpture", instructor: "Sarah Lee", price: 129, rating: 4.9, image: "/placeholder.svg", level: "Advanced" },
    { id: 4, title: "Glazing Techniques", instructor: "Tom Wilson", price: 79, rating: 4.6, image: "/placeholder.svg", level: "Intermediate" },
    { id: 5, title: "Hand Building Workshop", instructor: "Emma Davis", price: 69, rating: 4.8, image: "/placeholder.svg", level: "Beginner" },
    { id: 6, title: "Decorative Pottery", instructor: "Chris Brown", price: 89, rating: 4.7, image: "/placeholder.svg", level: "Intermediate" },
    { id: 7, title: "Raku Firing Workshop", instructor: "Lisa Chen", price: 149, rating: 4.9, image: "/placeholder.svg", level: "Advanced" },
    { id: 8, title: "Clay Modeling Basics", instructor: "David Kim", price: 59, rating: 4.5, image: "/placeholder.svg", level: "Beginner" },
  ],
  Painting: [
    { id: 1, title: "Oil Painting Fundamentals", instructor: "Robert Ross", price: 79, rating: 4.8, image: "/placeholder.svg", level: "Beginner" },
    // ... similar structure for other painting classes
  ],
  // ... similar structure for other categories
};

interface ClassGridProps {
  category: string;
}

const ClassGrid = ({ category }: ClassGridProps) => {
  const classes = mockClasses[category as keyof typeof mockClasses] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {classes.map((classItem) => (
        <Card key={classItem.id} className="overflow-hidden group">
          <div className="relative aspect-video">
            <img
              src={classItem.image}
              alt={classItem.title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold line-clamp-2">{classItem.title}</h3>
              <Badge variant="secondary">{classItem.level}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">by {classItem.instructor}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-medium">{classItem.rating}</span>
              </div>
              <span className="font-semibold">${classItem.price}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ClassGrid;