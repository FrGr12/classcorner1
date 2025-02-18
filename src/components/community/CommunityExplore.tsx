
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Palette, 
  Scissors, 
  Camera, 
  Music, 
  Cookie, 
  Wine, 
  Flower2,
  PenTool,
  Shirt,
  MessageSquare
} from "lucide-react";

const categories = [
  { name: "Painting", icon: <Palette className="w-4 h-4" /> },
  { name: "Ceramics", icon: <Cookie className="w-4 h-4" /> },
  { name: "Photography", icon: <Camera className="w-4 h-4" /> },
  { name: "Music", icon: <Music className="w-4 h-4" /> },
  { name: "Paper Crafts", icon: <Scissors className="w-4 h-4" /> },
  { name: "Wine & Spirits", icon: <Wine className="w-4 h-4" /> },
  { name: "Floral Design", icon: <Flower2 className="w-4 h-4" /> },
  { name: "Calligraphy", icon: <PenTool className="w-4 h-4" /> },
  { name: "Fashion", icon: <Shirt className="w-4 h-4" /> }
];

const topics = [
  "Beginner Tips",
  "Advanced Techniques",
  "Tool Recommendations",
  "Project Showcases",
  "Craft Supplies",
  "Workshop Setup",
  "Business Tips",
  "Inspiration",
  "Troubleshooting"
];

const CommunityExplore = () => {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      {/* Main Content */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trending Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <MessageSquare className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Tips for Setting Up Your First Pottery Studio</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Essential tools and space organization for beginners
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Posted by Studio Master</span>
                      <span>•</span>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Topics</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="px-4 pb-4">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className="w-full text-left px-2 py-2 rounded hover:bg-accent text-sm transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Be respectful and supportive</li>
              <li>Share knowledge freely</li>
              <li>Give credit where due</li>
              <li>Keep discussions on topic</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityExplore;
