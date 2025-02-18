import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CommunityHome from "@/components/community/CommunityHome";
import Navigation from "@/components/landing/Navigation";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Post } from "@/types/community";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
const POSTS_PER_PAGE = 10;
const INITIAL_TOPICS_TO_SHOW = 10;
const Community = () => {
  const navigate = useNavigate();
  const {
    topic,
    category,
    resource
  } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTopics, setShowAllTopics] = useState(false);
  const {
    ref,
    inView
  } = useInView();
  useEffect(() => {
    document.title = "Community - Craftscape";
  }, []);

  // Fetch topics with their post counts
  const {
    data: topicsData
  } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('posts').select('tags').not('tags', 'is', null);
      if (error) throw error;

      // Count occurrences of each tag
      const tagCounts = data.reduce((acc: Record<string, number>, post) => {
        post.tags?.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});

      // Convert to array and sort by count
      return Object.entries(tagCounts).map(([name, count]) => ({
        name,
        count
      })).sort((a, b) => b.count - a.count);
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
    queryFn: async ({
      pageParam = 0
    }) => {
      let query = supabase.from('posts').select('*', {
        count: 'exact'
      });
      if (topic) {
        query = query.contains('tags', [topic]);
      }
      if (category && category !== 'all') {
        // Only filter by category if it's not 'all'
        query = query.eq('category', category);
      }
      if (searchQuery) {
        query = query.textSearch('search_vector', searchQuery);
      }
      const {
        data,
        error,
        count
      } = await query.order('created_at', {
        ascending: false
      }).range(pageParam * POSTS_PER_PAGE, (pageParam + 1) * POSTS_PER_PAGE - 1);
      if (error) throw error;
      return {
        posts: data as Post[],
        totalCount: count || 0,
        nextPage: data.length === POSTS_PER_PAGE ? pageParam + 1 : undefined
      };
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const handleTopicClick = (topicName: string) => {
    navigate(`/community/topic/${topicName.toLowerCase().replace(/ /g, '-')}`);
  };
  const handleResourceClick = (resourceName: string) => {
    navigate(`/community/resource/${resourceName.toLowerCase().replace(/ /g, '-')}`);
  };
  const displayedTopics = showAllTopics ? topicsData : topicsData?.slice(0, INITIAL_TOPICS_TO_SHOW);
  if (error) {
    return <div className="min-h-screen bg-background pt-24">
        <Navigation />
        <div className="container mx-auto py-8 px-4">
          <p className="text-red-500">Error loading posts: {(error as Error).message}</p>
        </div>
      </div>;
  }
  return <>
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
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="px-3 py-2 text-base font-semibold text-left">Topics</h3>
                <nav className="space-y-1">
                  <button onClick={() => navigate('/community/category/all')} className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${!topic && category === 'all' ? 'bg-accent' : ''}`}>
                    <span>All Posts</span>
                  </button>
                  
                  {displayedTopics?.map(topicItem => <button key={topicItem.name} onClick={() => handleTopicClick(topicItem.name)} className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${topic === topicItem.name.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''}`}>
                      <span>{topicItem.name}</span>
                      <span className="text-muted-foreground text-xs">{topicItem.count}</span>
                    </button>)}
                  
                  {topicsData && topicsData.length > INITIAL_TOPICS_TO_SHOW && <Button variant="ghost" className="w-full text-sm flex items-center justify-center gap-2" onClick={() => setShowAllTopics(!showAllTopics)}>
                      {showAllTopics ? <>Show Less <ChevronUp className="h-4 w-4" /></> : <>Show More <ChevronDown className="h-4 w-4" /></>}
                    </Button>}
                </nav>
              </div>

              <div className="space-y-1">
                <h3 className="px-3 py-2 text-left text-base font-semibold">Learning Resources</h3>
                <nav className="space-y-1">
                  {["Beginner Guides", "Tutorials", "Best Practices", "Tool Reviews", "Project Ideas", "Expert Tips"].map(resourceName => <button key={resourceName} onClick={() => handleResourceClick(resourceName)} className={`w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg ${resource === resourceName.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''}`}>
                      {resourceName}
                    </button>)}
                </nav>
              </div>
            </div>

            <main>
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search posts, communities, or resources..." className="pl-9 w-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
              </div>

              {isLoading ? <div className="space-y-4">
                  {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
                </div> : <>
                  <CommunityHome topic={topic} category={category} resource={resource} posts={data?.pages.flatMap(page => page.posts) || []} />
                  {isFetchingNextPage && <div className="mt-4 space-y-4">
                      {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
                    </div>}
                  <div ref={ref} className="h-10" />
                </>}
            </main>
          </div>
        </div>
      </div>
    </>;
};
export default Community;