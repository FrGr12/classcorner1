import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreatePostDialog } from "./CreatePostDialog";
import { CreateResourceDialog } from "@/components/admin/CreateResourceDialog";
import { ResourceCard } from "./resources/ResourceCard";
import { PostCard } from "./posts/PostCard";

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
    author: "Craftscape Team",
    content: "Learn the fundamentals of pottery in this comprehensive guide. From selecting the right clay to mastering basic techniques, this guide will help you start your pottery journey with confidence.",
    publishedDate: "2024-02-15"
  },
  {
    id: 2,
    title: "Photography Equipment Essentials",
    description: "Learn about the fundamental equipment needed to start your photography journey.",
    type: "Tutorial",
    category: "Photography",
    readTime: "12 min read",
    author: "Craftscape Team",
    content: "Discover what equipment you really need to start photography. We'll cover cameras, lenses, and essential accessories without breaking the bank.",
    publishedDate: "2024-02-14"
  },
  {
    id: 3,
    title: "Setting Up Your Home Studio",
    description: "Expert advice on creating the perfect creative space at home, including lighting and organization tips.",
    type: "Guide",
    category: "Studio Setup",
    readTime: "20 min read",
    author: "Craftscape Team",
    content: "Transform any space into a functional art studio with our comprehensive guide to studio setup, organization, and essential equipment.",
    publishedDate: "2024-02-13"
  },
  {
    id: 4,
    title: "Digital Photography Post-Processing",
    description: "Master the art of photo editing with this comprehensive tutorial on post-processing techniques.",
    type: "Tutorial",
    category: "Photography",
    readTime: "25 min read",
    author: "Craftscape Team",
    content: "Learn professional photo editing techniques using industry-standard software. From basic adjustments to advanced color grading.",
    publishedDate: "2024-02-12"
  },
  {
    id: 5,
    title: "Sustainable Art Supplies Guide",
    description: "A comprehensive guide to eco-friendly art materials and sustainable creative practices.",
    type: "Guide",
    category: "Sustainability",
    readTime: "18 min read",
    author: "Craftscape Team",
    content: "Discover how to make your art practice more environmentally friendly with our guide to sustainable materials and techniques.",
    publishedDate: "2024-02-11"
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
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      
      setIsAdmin(profile?.user_type === 'admin');
    }
  };

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
    navigate(`/community/post/${postId}`);
  };

  if (resource) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {resource.replace(/-/g, ' ')}
          </h2>
          {isAdmin && <CreateResourceDialog />}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={handlePostClick}
            />
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
        <PostCard
          key={post.id}
          post={post}
          onPostClick={handlePostClick}
          onTagClick={handleTagClick}
        />
      ))}

      {filteredPosts.length === 0 && !resource && (
        <div className="text-center py-8 text-muted-foreground">
          No posts found for this {topic ? 'topic' : 'category'}
        </div>
      )}
    </div>
  );
};

export default CommunityHome;
