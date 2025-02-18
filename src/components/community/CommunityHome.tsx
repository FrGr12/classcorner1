
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle,
  ArrowUp,
  MessageCircle,
  Bookmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const posts = [
  {
    id: 1,
    title: "Just finished my first ceramic workshop and I'm hooked!",
    content: "The experience was amazing and I learned so much. Here are some tips for beginners...",
    author: "Ceramic Enthusiast",
    votes: 42,
    comments: 24,
    tags: [
      { name: "Pottery", color: "bg-accent-purple text-white" },
      { name: "Beginner", color: "bg-accent-pink text-primary" }
    ]
  },
  {
    id: 2,
    title: "My journey into nature photography - Equipment recommendations",
    content: "After exploring different cameras and lenses, here's what I found works best for nature shots...",
    author: "NatureShots",
    votes: 38,
    comments: 16,
    tags: [
      { name: "Photography", color: "bg-accent-lavender text-primary" },
      { name: "Equipment", color: "bg-accent-rose text-primary" }
    ]
  },
  {
    id: 3,
    title: "Created my first handmade paper collection",
    content: "The process of making paper from scratch was incredibly rewarding. Here's my experience...",
    author: "PaperArtisan",
    votes: 56,
    comments: 31,
    tags: [
      { name: "Paper Crafts", color: "bg-accent-coral text-white" },
      { name: "DIY", color: "bg-accent-pink text-primary" }
    ]
  },
  {
    id: 4,
    title: "Tips for setting up your home pottery studio",
    content: "Everything you need to know about creating the perfect pottery workspace at home...",
    author: "StudioPro",
    votes: 89,
    comments: 45,
    tags: [
      { name: "Pottery", color: "bg-accent-purple text-white" },
      { name: "Studio Setup", color: "bg-accent-lavender text-primary" }
    ]
  }
];

const CommunityHome = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Popular Posts</h2>
        <Button variant="outline" size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {posts.map((post) => (
        <Card key={post.id} className="hover:bg-accent/5 transition-colors">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{post.votes}</span>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold hover:text-accent-purple cursor-pointer">
                  {post.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag.name} 
                      className={`${tag.color} hover:opacity-90 cursor-pointer transition-opacity`}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="text-xs">Posted by {post.author}</span>
                  <span>•</span>
                  <button className="flex items-center gap-1 hover:text-accent-purple">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments} comments
                  </button>
                  <button className="flex items-center gap-1 hover:text-accent-purple">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityHome;
