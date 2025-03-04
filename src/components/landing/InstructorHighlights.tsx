
import { Link } from "react-router-dom";
import InstructorBadge from "@/components/instructor-profile/InstructorBadge";

const InstructorHighlights = () => {
  const instructors = [
    {
      id: "1",
      name: "Sarah Johnson",
      expertise: "Pottery Expert",
      bio: "Certified pottery instructor with 10+ years of experience teaching all skill levels. Join Sarah's classes for expert guidance in a supportive environment.",
      image: "/instructors/sarah-johnson.jpg",
      classification: "certified" as const,
    },
    {
      id: "2",
      name: "Michael Chen",
      expertise: "Cooking Enthusiast",
      bio: "Passionate home cook sharing family recipes and cooking techniques. Michael's classes are perfect for those wanting to learn authentic Asian cuisine.",
      image: "/instructors/michael-chen.jpg",
      classification: "host" as const,
    },
    {
      id: "3",
      name: "Emma Wilson",
      expertise: "Photography Pro",
      bio: "Award-winning photographer with a focus on teaching practical skills. Emma's classes cover everything from basic techniques to advanced editing.",
      image: "/instructors/emma-wilson.jpg",
      classification: "certified" as const,
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-normal text-center mb-8">Learn from Expert Instructors</h2>
        <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-12">
          Discover unique classes taught by talented instructors with real-world experience and passion for teaching.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map(instructor => (
            <Link 
              key={instructor.id}
              to={`/instructor/${instructor.id}`} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-neutral-200 relative overflow-hidden">
                {instructor.image ? (
                  <img 
                    src={instructor.image} 
                    alt={`${instructor.name}, ${instructor.expertise}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    <img src="/placeholder.svg" alt="Instructor placeholder" className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-sans font-medium text-lg">{instructor.name}</h3>
                  <InstructorBadge classification={instructor.classification} size="sm" />
                </div>
                <p className="text-accent-purple font-medium">{instructor.expertise}</p>
                <p className="mt-2 text-neutral-600 text-sm line-clamp-3">
                  {instructor.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/browse" 
            className="inline-flex items-center text-accent-purple hover:text-accent-purple/90 font-medium"
          >
            Explore all instructors
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstructorHighlights;
