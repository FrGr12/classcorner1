import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CreatePostDialog } from "./CreatePostDialog";
import { CreateResourceDialog } from "@/components/admin/CreateResourceDialog";
import { ResourceCard } from "./resources/ResourceCard";
import { PostCard } from "./posts/PostCard";
import { Post } from "@/types/community";

interface CommunityHomeProps {
  topic?: string;
  category?: string;
  resource?: string;
  posts: Post[];
}

const CommunityHome = ({ topic, category, resource, posts }: CommunityHomeProps) => {
  const navigate = useNavigate();

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
          <CreateResourceDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((resource) => (
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

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onPostClick={handlePostClick}
          onTagClick={handleTagClick}
        />
      ))}

      {posts.length === 0 && !resource && (
        <div className="text-center py-8 text-muted-foreground">
          No posts found for this {topic ? 'topic' : 'category'}
        </div>
      )}
    </div>
  );
};

export default CommunityHome;
