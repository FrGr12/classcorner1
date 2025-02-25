
import { Separator } from "@/components/ui/separator";
import { TopicsList } from "./TopicsList";
import { GroupsList } from "./GroupsList";
import { ResourcesList } from "./ResourcesList";

interface CommunitySidebarProps {
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
  groupsData?: Array<{
    id: number;
    name: string;
    type: string;
  }>;
  showAllTopics: boolean;
  onTopicClick: (topicName: string) => void;
  onGroupClick: (groupId: number) => void;
  onResourceClick: (resourceName: string) => void;
  onShowAllTopicsToggle: () => void;
  onAllPostsClick: () => void;
  onViewAllGroupsClick: () => void;
}

export const CommunitySidebar = ({
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
}: CommunitySidebarProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2 px-3 text-accent-purple">Popular Topics</h2>
        <TopicsList 
          displayedTopics={displayedTopics} 
          topic={topic} 
          category={category} 
          showAllTopics={showAllTopics} 
          topicsData={topicsData} 
          onTopicClick={onTopicClick} 
          onShowAllTopicsToggle={onShowAllTopicsToggle} 
          onAllPostsClick={onAllPostsClick} 
        />
      </div>

      <Separator className="my-4" />
      
      <div>
        <h2 className="text-lg font-semibold mb-2 px-3 text-accent-purple">Community Groups</h2>
        <GroupsList 
          groups={groupsData} 
          onGroupClick={onGroupClick} 
          onViewAllClick={onViewAllGroupsClick} 
        />
      </div>

      <Separator className="my-4" />

      <div>
        <h2 className="text-lg font-semibold mb-2 px-3 text-accent-purple">Learning Resources</h2>
        <ResourcesList 
          resource={resource} 
          onResourceClick={onResourceClick} 
        />
      </div>
    </div>
  );
};
