import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CreatePostDialog } from "./CreatePostDialog";
import { CreateResourceDialog } from "@/components/admin/CreateResourceDialog";
import { ResourceCard, Resource } from "./resources/ResourceCard";
import { PostCard } from "./posts/PostCard";
import { Post } from "@/types/community";
interface CommunityHomeProps {
  topic?: string;
  category?: string;
  resource?: string;
  posts: Post[];
}
const CommunityHome = ({
  topic,
  category,
  resource,
  posts
}: CommunityHomeProps) => {
  const navigate = useNavigate();
  const handleTagClick = (tagName: string) => {
    navigate(`/community/category/${tagName.toLowerCase().replace(/ /g, '-')}`);
  };
  const handlePostClick = (postId: number) => {
    navigate(`/community/post/${postId}`);
  };
  if (resource) {
    return <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {resource.replace(/-/g, ' ')}
          </h2>
          <CreateResourceDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => {
          // Transform Post into Resource format
          const resource: Resource = {
            id: post.id,
            title: post.title,
            description: post.content,
            type: post.topic || "Article",
            category: post.category || "General",
            readTime: "5 min read",
            // Default value since Post doesn't have this
            author: post.author_id,
            publishedDate: post.created_at
          };
          return <ResourceCard key={post.id} resource={resource} onClick={handlePostClick} />;
        })}
        </div>
      </div>;
  }
  return <div className="space-y-4">
      <div className="flex justify-between items-center">
        
        <CreatePostDialog />
      </div>

      {posts.map(post => <PostCard key={post.id} post={post} onPostClick={handlePostClick} onTagClick={handleTagClick} />)}

      {posts.length === 0 && !resource && <div className="text-center py-8 text-muted-foreground">
          No posts found for this {topic ? 'topic' : 'category'}
        </div>}
    </div>;
};
export default CommunityHome;