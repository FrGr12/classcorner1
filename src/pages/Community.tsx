
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CommunityHome from "@/components/community/CommunityHome";
import Navigation from "@/components/landing/Navigation";
import { Post } from "@/types/community";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { CommunitySidebar } from "@/components/community/sidebar/CommunitySidebar";
import { SearchBar } from "@/components/community/search/SearchBar";

const POSTS_PER_PAGE = 10;
const INITIAL_TOPICS_TO_SHOW = 10;

const Community = () => {
  const navigate = useNavigate();
  const { topic, category, resource } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTopics, setShowAllTopics] = useState(false);
  const { ref, inView } = useInView();

  const { data: groupsData } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_groups')
        .select('*')
        .order('member_count', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: topicsData } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('tags')
        .not('tags', 'is', null);
      
      if (error) throw error;
      
      const tagCounts = data.reduce((acc: Record<string, number>, post) => {
        post.tags?.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});

      return Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    }
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['posts', topic, category, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      let query = supabase.from('posts').select('*', { count: 'exact' });

      if (topic) {
        query = query.contains('tags', [topic]);
      }
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      if (searchQuery) {
        query = query.textSearch('search_vector', searchQuery);
      }

      const { data: posts, error, count } = await query
        .order('created_at', { ascending: false })
        .range(pageParam * POSTS_PER_PAGE, (pageParam + 1) * POSTS_PER_PAGE - 1);

      if (error) throw error;

      return {
        posts: posts as Post[],
        totalCount: count || 0,
        nextPage: posts.length === POSTS_PER_PAGE ? pageParam + 1 : undefined
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5
  });

  const handleTopicClick = (topicName: string) => {
    navigate(`/community/topic/${topicName.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleResourceClick = (resourceName: string) => {
    navigate(`/community/resource/${resourceName.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleGroupClick = (groupId: number) => {
    navigate('/community/groups');
  };

  const displayedTopics = showAllTopics 
    ? topicsData 
    : topicsData?.slice(0, INITIAL_TOPICS_TO_SHOW);

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Navigation />
        <div className="container mx-auto py-8 px-4">
          <p className="text-red-500">Error loading posts: {(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24">
        <div className="border-b bg-card">
          <div className="container mx-auto py-6 px-4">
            <h1 className="text-4xl font-bold mb-2">Community</h1>
            <p className="text-muted-foreground">
              Connect with fellow crafters, share experiences, and learn together
            </p>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <CommunitySidebar
              topic={topic}
              category={category}
              resource={resource}
              displayedTopics={displayedTopics || []}
              topicsData={topicsData}
              groupsData={groupsData}
              showAllTopics={showAllTopics}
              onTopicClick={handleTopicClick}
              onGroupClick={handleGroupClick}
              onResourceClick={handleResourceClick}
              onShowAllTopicsToggle={() => setShowAllTopics(!showAllTopics)}
              onAllPostsClick={() => navigate('/community/category/all')}
              onViewAllGroupsClick={() => navigate('/community/groups')}
            />

            <main>
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : (
                <>
                  <CommunityHome
                    topic={topic}
                    category={category}
                    resource={resource}
                    posts={data?.pages.flatMap(page => page.posts) || []}
                  />
                  {isFetchingNextPage && (
                    <div className="mt-4 space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                      ))}
                    </div>
                  )}
                  <div ref={ref} className="h-10" />
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
