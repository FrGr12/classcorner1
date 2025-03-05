
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Filter, Hash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CommunityHome from "@/components/community/CommunityHome";
import { SearchBar } from "@/components/community/search/SearchBar";
import { useEffect } from "react";
import { Post } from "@/types/community";

interface TopicItem {
  name: string;
  count: number;
}

interface CommunityContentProps {
  activeTab: string;
  topic?: string;
  category?: string;
  resource?: string;
  data: any;
  displayedTopics?: TopicItem[];
  groupsData?: any;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  error: any;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onTopicClick: (topicName: string) => void;
  fetchNextPage: () => void;
  handleTabClick: (tab: string) => void;
}

export const CommunityContent = ({
  activeTab,
  topic,
  category,
  resource,
  data,
  displayedTopics,
  groupsData,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  error,
  searchQuery,
  onSearchChange,
  onTopicClick,
  fetchNextPage,
  handleTabClick
}: CommunityContentProps) => {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    delay: 100
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderContent = () => {
    switch (activeTab) {
      case 'groups':
        return (
          <div className="space-y-4">
            {groupsData?.map((group: any) => (
              <div key={group.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{group.name}</h3>
              </div>
            ))}
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Learning Resources</h3>
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="lg:hidden mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between bg-white">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter Posts</span>
                    </div>
                    <Hash className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-[calc(100vw-32px)] max-w-[400px] bg-white border" 
                  style={{ backgroundColor: 'white' }}
                >
                  {displayedTopics?.map(topicItem => (
                    <DropdownMenuItem
                      key={topicItem.name}
                      className="flex justify-between hover:bg-gray-50"
                      onClick={() => onTopicClick(topicItem.name)}
                    >
                      <span>{topicItem.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {topicItem.count}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CommunityHome 
              topic={topic} 
              category={category} 
              resource={resource} 
              posts={data?.pages.flatMap((page: any) => page.posts) || []} 
            />
            {isFetchingNextPage && (
              <div className="mt-4 space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            )}
            <div ref={loadMoreRef} className="h-10" />
          </>
        );
    }
  };

  if (error) {
    return (
      <p className="text-red-500">Error loading posts: {(error as Error).message}</p>
    );
  }

  return (
    <main className="min-w-0">
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {activeTab === 'topics' && 'Latest Posts'}
            {activeTab === 'groups' && 'Community Groups'}
            {activeTab === 'resources' && 'Learning Resources'}
          </h2>
        </div>
        
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : renderContent()}
      </div>
    </main>
  );
};
