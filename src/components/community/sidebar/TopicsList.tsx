
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const currentTopic = topic 
    ? displayedTopics?.find(t => t.name.toLowerCase().replace(/ /g, '-') === topic)?.name 
    : 'All Topics';

  return (
    <div className="space-y-1">
      <h3 className="px-3 py-2 text-left font-semibold text-accent-purple">Topics</h3>
      
      {/* Mobile dropdown */}
      <div className="block lg:hidden px-3 mb-4">
        <Select 
          value={currentTopic} 
          onValueChange={(value) => {
            if (value === "all") {
              onAllPostsClick();
            } else {
              onTopicClick(value);
            }
          }}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            {displayedTopics?.map(topicItem => (
              <SelectItem 
                key={topicItem.name} 
                value={topicItem.name}
                className="flex justify-between"
              >
                <div className="flex justify-between w-full">
                  <span>{topicItem.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {topicItem.count}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Desktop navigation */}
      <nav className="hidden lg:block space-y-1">
        <button 
          onClick={onAllPostsClick} 
          className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${!topic && category === 'all' ? 'bg-accent' : ''}`}
        >
          <span>All Posts</span>
        </button>
        
        {displayedTopics?.map(topicItem => (
          <button 
            key={topicItem.name} 
            onClick={() => onTopicClick(topicItem.name)} 
            className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${topic === topicItem.name.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''}`}
          >
            <span>{topicItem.name}</span>
            <span className="text-muted-foreground text-xs">
              {topicItem.count}
            </span>
          </button>
        ))}
        
        {topicsData && topicsData.length > 10 && (
          <Button 
            variant="ghost" 
            className="w-full text-sm flex items-center justify-center gap-2" 
            onClick={onShowAllTopicsToggle}
          >
            {showAllTopics ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Show More <ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
        )}
      </nav>
    </div>
  );
};
