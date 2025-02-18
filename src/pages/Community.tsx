
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunityHome from "@/components/community/CommunityHome";
import Navigation from "@/components/landing/Navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Community = () => {
  const navigate = useNavigate();
  const { topic, category, resource } = useParams();

  useEffect(() => {
    document.title = "Community - Craftscape";
  }, []);

  const handleTopicClick = (topicName: string) => {
    navigate(`/community/topic/${topicName.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/community/category/${categoryName.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleResourceClick = (resourceName: string) => {
    navigate(`/community/resource/${resourceName.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24">
        {/* Community Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto py-6 px-4">
            <h1 className="text-4xl font-bold mb-2">Community</h1>
            <p className="text-muted-foreground">
              Connect with fellow crafters, share experiences, and learn together
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto py-8 px-4">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            {/* Left Sidebar */}
            <div className="space-y-6">
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
                  ].map((topicName) => (
                    <button
                      key={topicName}
                      onClick={() => handleTopicClick(topicName)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg ${
                        topic === topicName.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''
                      }`}
                    >
                      {topicName}
                    </button>
                  ))}
                </nav>
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
                      onClick={() => handleCategoryClick(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${
                        category === category.name.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''
                      }`}
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
                  ].map((resourceName) => (
                    <button
                      key={resourceName}
                      onClick={() => handleResourceClick(resourceName)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg ${
                        resource === resourceName.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''
                      }`}
                    >
                      {resourceName}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <main>
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search posts, communities, or resources..." 
                    className="pl-9 w-full"
                  />
                </div>
              </div>
              <CommunityHome topic={topic} category={category} resource={resource} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
