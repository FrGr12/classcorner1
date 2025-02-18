
import { useEffect } from "react";
import CommunityHome from "@/components/community/CommunityHome";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Community = () => {
  useEffect(() => {
    document.title = "Community - Craftscape";
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search communities" 
              className="pl-9"
            />
          </div>

          {/* Categories */}
          <div className="space-y-1">
            <h3 className="font-medium px-3 py-2">Categories</h3>
            <nav className="space-y-1">
              {[
                { name: "All", count: "204K" },
                { name: "Pottery", count: "45.2K" },
                { name: "Ceramics", count: "32.1K" },
                { name: "Photography", count: "28.9K" },
                { name: "Music", count: "25.6K" },
                { name: "Paper Crafts", count: "22.3K" },
                { name: "Wine & Spirits", count: "18.7K" },
                { name: "Floral Design", count: "15.4K" },
                { name: "Calligraphy", count: "12.8K" },
                { name: "Fashion", count: "10.5K" }
              ].map((category) => (
                <button
                  key={category.name}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  <span>{category.name}</span>
                  <span className="text-muted-foreground text-xs">{category.count}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-1">
            <h3 className="font-medium px-3 py-2">Learning Resources</h3>
            <nav className="space-y-1">
              {[
                "Beginner Guides",
                "Tutorials",
                "Best Practices",
                "Tool Reviews",
                "Project Ideas",
                "Expert Tips"
              ].map((resource) => (
                <button
                  key={resource}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  {resource}
                </button>
              ))}
            </nav>
          </div>

          {/* Topics */}
          <div className="space-y-1">
            <h3 className="font-medium px-3 py-2">Popular Topics</h3>
            <nav className="space-y-1">
              {[
                "Studio Setup",
                "Tool Recommendations",
                "Material Sourcing",
                "Technique Showcase",
                "Business Tips",
                "Community Events"
              ].map((topic) => (
                <button
                  key={topic}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  {topic}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main>
          <CommunityHome />
        </main>
      </div>
    </div>
  );
};

export default Community;
