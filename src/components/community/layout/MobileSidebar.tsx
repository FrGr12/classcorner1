
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CommunitySidebar } from "@/components/community/sidebar/CommunitySidebar";

interface MobileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  topic?: string;
  category?: string;
  resource?: string;
  displayedTopics: Array<{
    name: string;
    count: number;
  }>;
  topicsData?: Array<{
    name: string;
    count: number;
  }>;
  groupsData?: any;
  showAllTopics: boolean;
  onTopicClick: (name: string) => void;
  onGroupClick: (id: number) => void;
  onResourceClick: (name: string) => void;
  onShowAllTopicsToggle: () => void;
  onAllPostsClick: () => void;
  onViewAllGroupsClick: () => void;
}

export function MobileSidebar({
  sidebarOpen,
  setSidebarOpen,
  topic,
  category,
  resource,
  displayedTopics,
  topicsData,
  groupsData,
  showAllTopics,
  onTopicClick,
  onGroupClick,
  onResourceClick,
  onShowAllTopicsToggle,
  onAllPostsClick,
  onViewAllGroupsClick
}: MobileSidebarProps) {
  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0" aria-label="Community navigation">
        <div className="h-full py-4 px-3 overflow-y-auto">
          <CommunitySidebar 
            topic={topic} 
            category={category} 
            resource={resource} 
            displayedTopics={displayedTopics || []} 
            topicsData={topicsData} 
            groupsData={groupsData} 
            showAllTopics={showAllTopics} 
            onTopicClick={(name) => {
              onTopicClick(name);
              setSidebarOpen(false);
            }} 
            onGroupClick={(id) => {
              onGroupClick(id);
              setSidebarOpen(false);
            }} 
            onResourceClick={(name) => {
              onResourceClick(name);
              setSidebarOpen(false);
            }} 
            onShowAllTopicsToggle={onShowAllTopicsToggle} 
            onAllPostsClick={() => {
              onAllPostsClick();
              setSidebarOpen(false);
            }} 
            onViewAllGroupsClick={() => {
              onViewAllGroupsClick();
              setSidebarOpen(false);
            }} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
