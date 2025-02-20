import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
interface TopicsListProps {
  displayedTopics: Array<{
    name: string;
    count: number;
  }>;
  topic?: string;
  category?: string;
  showAllTopics: boolean;
  topicsData?: Array<{
    name: string;
    count: number;
  }>;
  onTopicClick: (topicName: string) => void;
  onShowAllTopicsToggle: () => void;
  onAllPostsClick: () => void;
}
export const TopicsList = ({
  displayedTopics,
  topic,
  category,
  showAllTopics,
  topicsData,
  onTopicClick,
  onShowAllTopicsToggle,
  onAllPostsClick
}: TopicsListProps) => {
  return <div className="space-y-1">
      <h3 className="px-3 py-2 text-left font-semibold">Topics</h3>
      <nav className="space-y-1">
        <button onClick={onAllPostsClick} className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${!topic && category === 'all' ? 'bg-accent' : ''}`}>
          <span>All Posts</span>
        </button>
        
        {displayedTopics?.map(topicItem => <button key={topicItem.name} onClick={() => onTopicClick(topicItem.name)} className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${topic === topicItem.name.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''}`}>
            <span>{topicItem.name}</span>
            <span className="text-muted-foreground text-xs">
              {topicItem.count}
            </span>
          </button>)}
        
        {topicsData && topicsData.length > 10 && <Button variant="ghost" className="w-full text-sm flex items-center justify-center gap-2" onClick={onShowAllTopicsToggle}>
            {showAllTopics ? <>Show Less <ChevronUp className="h-4 w-4" /></> : <>Show More <ChevronDown className="h-4 w-4" /></>}
          </Button>}
      </nav>
    </div>;
};