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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Hash } from "lucide-react";

const POSTS_PER_PAGE = 10;
const INITIAL_TOPICS_TO_SHOW = 10;

const Community = () => {
  const navigate = useNavigate();
  const { topic, category, resource } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('topics');

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
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
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5
  });

  const handleTopicClick = (topicName: string) => {
    navigate(`/community/topic/${topicName.toLowerCase().replace(/ /g, '-')}`);
    setSidebarOpen(false);
  };

  const handleResourceClick = (resourceName: string) => {
    navigate(`/community/resource/${resourceName.toLowerCase().replace(/ /g, '-')}`);
    setSidebarOpen(false);
  };

  const handleGroupClick = (groupId: number) => {
    navigate('/community/groups');
    setSidebarOpen(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(true);
  };

  const displayedTopics = showAllTopics ? topicsData : topicsData?.slice(0, INITIAL_TOPICS_TO_SHOW);

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
        <div className="lg:hidden fixed top-[4.5rem] left-0 right-0 z-40 bg-background border-b">
          <div className="flex items-center justify-around p-3">
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center w-24 gap-2 h-auto py-3 rounded-lg transition-colors
                ${activeTab === 'topics' 
                  ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' 
                  : 'hover:bg-accent-purple/5'}`}
              onClick={() => handleTabClick('topics')}
            >
              <Hash className="h-5 w-5" />
              <span className="text-sm font-medium">Topics</span>
            </Button>
            <Button 
              variant="ghost"
              className={`flex flex-col items-center w-24 gap-2 h-auto py-3 rounded-lg transition-colors
                ${activeTab === 'groups' 
                  ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' 
                  : 'hover:bg-accent-purple/5'}`}
              onClick={() => handleTabClick('groups')}
            >
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Groups</span>
            </Button>
            <Button 
              variant="ghost"
              className={`flex flex-col items-center w-24 gap-2 h-auto py-3 rounded-lg transition-colors
                ${activeTab === 'resources' 
                  ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' 
                  : 'hover:bg-accent-purple/5'}`}
              onClick={() => handleTabClick('resources')}
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Resources</span>
            </Button>
          </div>
        </div>

        <div className="border-b bg-card">
          <div className="container mx-auto py-4 px-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 text-left truncate">Community</h1>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground text-left">
                  Connect with fellow crafters, share experiences, and learn together
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-4 px-4">
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
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
            </div>

            <main className="min-w-0 mt-20 lg:mt-0">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Latest Posts</h2>
                </div>
                
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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
              </div>
            </main>
          </div>

          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent 
              side="left" 
              className="w-[280px] sm:w-[320px] p-0"
            >
              <div className="h-full py-4 px-3">
                <CommunitySidebar
                  topic={topic}
                  category={category}
                  resource={resource}
                  displayedTopics={displayedTopics || []}
                  topicsData={topicsData}
                  groupsData={groupsData}
                  showAllTopics={showAllTopics}
                  onTopicClick={(name) => {
                    handleTopicClick(name);
                    setSidebarOpen(false);
                  }}
                  onGroupClick={(id) => {
                    handleGroupClick(id);
                    setSidebarOpen(false);
                  }}
                  onResourceClick={(name) => {
                    handleResourceClick(name);
                    setSidebarOpen(false);
                  }}
                  onShowAllTopicsToggle={() => setShowAllTopics(!showAllTopics)}
                  onAllPostsClick={() => {
                    navigate('/community/category/all');
                    setSidebarOpen(false);
                  }}
                  onViewAllGroupsClick={() => {
                    navigate('/community/groups');
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Community;
