import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Updated mock data to include multiple images per class
const mockClasses = {
  Ceramics: [
    { 
      id: 1, 
      title: "Introduction to Pottery", 
      instructor: "Jane Smith", 
      price: 89, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner" 
    },
    { 
      id: 2, 
      title: "Wheel Throwing Basics", 
      instructor: "Mike Johnson", 
      price: 99, 
      rating: 4.7, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner" 
    },
    { 
      id: 3, 
      title: "Advanced Ceramic Sculpture", 
      instructor: "Sarah Lee", 
      price: 129, 
      rating: 4.9, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Advanced" 
    },
    { 
      id: 4, 
      title: "Glazing Techniques", 
      instructor: "Tom Wilson", 
      price: 79, 
      rating: 4.6, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Intermediate" 
    },
    { 
      id: 5, 
      title: "Hand Building Workshop", 
      instructor: "Emma Davis", 
      price: 69, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner" 
    },
    { 
      id: 6, 
      title: "Decorative Pottery", 
      instructor: "Chris Brown", 
      price: 89, 
      rating: 4.7, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Intermediate" 
    },
    { 
      id: 7, 
      title: "Raku Firing Workshop", 
      instructor: "Lisa Chen", 
      price: 149, 
      rating: 4.9, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Advanced" 
    },
    { 
      id: 8, 
      title: "Clay Modeling Basics", 
      instructor: "David Kim", 
      price: 59, 
      rating: 4.5, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner" 
    },
  ],
  Painting: [
    { 
      id: 1, 
      title: "Oil Painting Fundamentals", 
      instructor: "Robert Ross", 
      price: 79, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      ],
      level: "Beginner" 
    },
    { 
      id: 2, 
      title: "Watercolor Techniques", 
      instructor: "Maria Chen", 
      price: 89, 
      rating: 4.7, 
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      ],
      level: "Intermediate" 
    },
  ],
  Cooking: [
    { 
      id: 1, 
      title: "Italian Cuisine Basics", 
      instructor: "Marco Rossi", 
      price: 99, 
      rating: 4.9, 
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner" 
    },
    { 
      id: 2, 
      title: "Advanced Pastry Making", 
      instructor: "Sophie Laurent", 
      price: 129, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Advanced" 
    },
  ],
  featured: [
    { 
      id: 1, 
      title: "Introduction to Pottery", 
      instructor: "Jane Smith", 
      price: 89, 
      rating: 4.9, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner",
      category: "Ceramics" 
    },
    { 
      id: 2, 
      title: "Oil Painting Masterclass", 
      instructor: "Robert Ross", 
      price: 99, 
      rating: 4.9, 
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      ],
      level: "Advanced",
      category: "Painting" 
    },
    { 
      id: 3, 
      title: "Italian Cuisine Basics", 
      instructor: "Marco Rossi", 
      price: 79, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner",
      category: "Cooking" 
    },
    { 
      id: 4, 
      title: "Portrait Photography", 
      instructor: "Sarah Lee", 
      price: 149, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      ],
      level: "Intermediate",
      category: "Photography" 
    },
    { 
      id: 5, 
      title: "Woodworking Essentials", 
      instructor: "John Wood", 
      price: 129, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Beginner",
      category: "Woodworking" 
    },
    { 
      id: 6, 
      title: "Ring Making Workshop", 
      instructor: "Emma Silver", 
      price: 99, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Intermediate",
      category: "Jewelry" 
    },
    { 
      id: 7, 
      title: "Advanced Ceramic Sculpture", 
      instructor: "Tom Wilson", 
      price: 159, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
      level: "Advanced",
      category: "Ceramics" 
    },
    { 
      id: 8, 
      title: "Watercolor Landscapes", 
      instructor: "Maria Chen", 
      price: 89, 
      rating: 4.8, 
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      ],
      level: "Intermediate",
      category: "Painting" 
    },
  ]
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
            <Carousel className="w-full">
              <CarouselContent>
                {classItem.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`${classItem.title} - Image ${index + 1}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden group-hover:flex" />
              <CarouselNext className="hidden group-hover:flex" />
            </Carousel>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold line-clamp-2">{classItem.title}</h3>
              <Badge 
                variant="secondary" 
                className="bg-accent-purple text-white hover:bg-accent-purple/90"
              >
                {classItem.level}
              </Badge>
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
