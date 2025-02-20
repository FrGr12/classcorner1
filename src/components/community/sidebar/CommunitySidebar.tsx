
import { Separator } from "@/components/ui/separator";
import { TopicsList } from "./TopicsList";
import { GroupsList } from "./GroupsList";
import { ResourcesList } from "./ResourcesList";

interface CommunitySidebarProps {
  topic?: string;
  category?: string;
  resource?: string;
  displayedTopics: Array<{ name: string; count: number }>;
  topicsData?: Array<{ name: string; count: number }>;
  groupsData?: Array<{ id: number; name: string; type: string }>;
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
  onViewAllGroupsClick,
}: CommunitySidebarProps) => {
  return (
    <div className="space-y-6">
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

      <Separator />
      
      <GroupsList
        groups={groupsData}
        onGroupClick={onGroupClick}
        onViewAllClick={onViewAllGroupsClick}
      />

      <Separator />

      <ResourcesList
        resource={resource}
        onResourceClick={onResourceClick}
      />
    </div>
  );
};
