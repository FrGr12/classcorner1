
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import { Post } from "@/types/community";
import { CommunitySidebar } from "@/components/community/sidebar/CommunitySidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CommunityHeader } from "@/components/community/layout/CommunityHeader";
import { MobileNavigation } from "@/components/community/layout/MobileNavigation";
import { CommunityContent } from "@/components/community/layout/CommunityContent";

const POSTS_PER_PAGE = 10;
const INITIAL_TOPICS_TO_SHOW = 10;

const Community = () => {
  const navigate = useNavigate();
  const { topic, category, resource } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState(() => {
    if (window.location.pathname.includes('/groups')) return 'groups';
    if (window.location.pathname.includes('/resources')) return 'resources';
    return 'topics';
  });

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
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (window.location.pathname.includes('/groups')) {
      setActiveTab('groups');
    } else if (window.location.pathname.includes('/resources')) {
      setActiveTab('resources');
    } else {
      setActiveTab('topics');
    }
  }, [window.location.pathname]);

  const handleTopicClick = (topicName: string) => {
    setActiveTab('topics');
    navigate(`/community/topic/${topicName.toLowerCase().replace(/ /g, '-')}`);
    setSidebarOpen(false);
  };

  const handleResourceClick = (resourceName: string) => {
    setActiveTab('resources');
    navigate(`/community/resource/${resourceName.toLowerCase().replace(/ /g, '-')}`);
    setSidebarOpen(false);
  };

  const handleGroupClick = (groupId: number) => {
    setActiveTab('groups');
    navigate('/community/groups');
    setSidebarOpen(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'topics':
        navigate('/community/category/all');
        break;
      case 'groups':
        navigate('/community/groups');
        break;
      case 'resources':
        navigate('/community/resources');
        break;
    }
  };

  const handleNewPostClick = () => {
    // Implementation for creating new post
  };

  const displayedTopics = showAllTopics 
    ? topicsData 
    : topicsData?.slice(0, INITIAL_TOPICS_TO_SHOW);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24">
        <CommunityHeader onNewPostClick={handleNewPostClick} />

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

            <div>
              <MobileNavigation activeTab={activeTab} onTabClick={handleTabClick} />
              
              <CommunityContent 
                activeTab={activeTab}
                topic={topic}
                category={category}
                resource={resource}
                data={data}
                displayedTopics={displayedTopics}
                groupsData={groupsData}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                error={error}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onTopicClick={handleTopicClick}
                fetchNextPage={fetchNextPage}
                handleTabClick={handleTabClick}
              />
            </div>
          </div>

          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
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
