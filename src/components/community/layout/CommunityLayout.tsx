
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommunitySidebar } from "@/components/community/sidebar/CommunitySidebar";
import { CommunityHeader } from "@/components/community/layout/CommunityHeader";
import { MobileNavigation } from "@/components/community/layout/MobileNavigation";
import { CommunityContent } from "@/components/community/layout/CommunityContent";
import { MobileSidebar } from "@/components/community/layout/MobileSidebar";

interface CommunityLayoutProps {
  activeTab: string;
  topic?: string;
  category?: string;
  resource?: string;
  communityData: any;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CommunityLayout({
  activeTab,
  topic,
  category,
  resource,
  communityData,
  setActiveTab,
  searchQuery,
  setSearchQuery
}: CommunityLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const {
    groupsData,
    displayedTopics,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    showAllTopics,
    setShowAllTopics
  } = communityData;

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

  return (
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
              topicsData={communityData.topicsData} 
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

        <MobileSidebar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          topic={topic}
          category={category}
          resource={resource}
          displayedTopics={displayedTopics || []}
          topicsData={communityData.topicsData}
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
    </div>
  );
}
