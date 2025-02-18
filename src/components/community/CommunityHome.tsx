import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle,
  ArrowUp,
  MessageCircle,
  Bookmark,
  FileText,
  Book,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CreatePostDialog } from "./CreatePostDialog";
import { CommentSection } from "./CommentSection";

interface CommunityHomeProps {
  topic?: string;
  category?: string;
  resource?: string;
}

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Complete Guide to Pottery Techniques",
    description: "A comprehensive guide covering all essential pottery techniques, from hand-building to wheel throwing.",
    type: "Guide",
    category: "Pottery",
    readTime: "15 min read",
    author: "Craftscape Team"
  },
  {
    id: 2,
    title: "Photography Equipment Essentials",
    description: "Learn about the fundamental equipment needed to start your photography journey.",
    type: "Tutorial",
    category: "Photography",
    readTime: "12 min read",
    author: "Craftscape Team"
  },
  {
    id: 3,
    title: "Setting Up Your Home Studio",
    description: "Expert advice on creating the perfect creative space at home, including lighting and organization tips.",
    type: "Guide",
    category: "Studio Setup",
    readTime: "20 min read",
    author: "Craftscape Team"
  }
];

// Mock data for posts
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

const CommunityHome = ({ topic, category, resource }: CommunityHomeProps) => {
  const navigate = useNavigate();

  const filteredPosts = posts.filter(post => {
    if (topic) {
      return post.tags.some(tag => tag.name.toLowerCase().replace(/ /g, '-') === topic);
    }
    if (category) {
      return post.tags.some(tag => tag.name.toLowerCase().replace(/ /g, '-') === category);
    }
    return true;
  });

  const filteredResources = resources.filter(res => {
    if (resource) {
      return res.type.toLowerCase().replace(/ /g, '-') === resource;
    }
    return true;
  });

  const handleTagClick = (tagName: string) => {
    navigate(`/community/category/${tagName.toLowerCase().replace(/ /g, '-')}`);
  };

  const handlePostClick = (postId: number) => {
    // In the future, this will navigate to the post detail page
    navigate(`/community/post/${postId}`);
  };

  if (resource) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {resource.replace(/-/g, ' ')}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {resource.type === "Guide" ? (
                        <Book className="h-5 w-5 text-accent-purple" />
                      ) : (
                        <FileText className="h-5 w-5 text-accent-purple" />
                      )}
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                    <Badge className="bg-accent-lavender text-primary">
                      {resource.category}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2 hover:text-accent-purple cursor-pointer group flex items-center gap-2">
                      {resource.title}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                    <span>{resource.author}</span>
                    <span>{resource.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {topic ? `Posts about ${topic.replace(/-/g, ' ')}` :
           category ? `Posts in ${category.replace(/-/g, ' ')}` :
           'Popular Posts'}
        </h2>
        <CreatePostDialog />
      </div>

      {filteredPosts.map((post) => (
        <Card 
          key={post.id} 
          className="hover:bg-accent/5 transition-colors cursor-pointer"
          onClick={() => handlePostClick(post.id)}
        >
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent post click when voting
                  }}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{post.votes}</span>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold hover:text-accent-purple">
                  {post.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag.name} 
                      className={`${tag.color} hover:opacity-90 cursor-pointer transition-opacity`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent post click when clicking tag
                        handleTagClick(tag.name);
                      }}
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
                  <button 
                    className="flex items-center gap-1 hover:text-accent-purple"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent post click when clicking comments
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {post.comments} comments
                  </button>
                  <button 
                    className="flex items-center gap-1 hover:text-accent-purple"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent post click when clicking save
                    }}
                  >
                    <Bookmark className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredPosts.length === 0 && !resource && (
        <div className="text-center py-8 text-muted-foreground">
          No posts found for this {topic ? 'topic' : 'category'}
        </div>
      )}

      {/* Add CommentSection component where needed */}
      {/* This is a placeholder - in a real implementation, you'd show comments 
          when a specific post is selected */}
      {/* <CommentSection postId={selectedPostId} comments={postComments} /> */}
    </div>
  );
};

export default CommunityHome;
