
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

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
  const [isOpen, setIsOpen] = React.useState(false);
  
  const currentTopic = topic 
    ? displayedTopics?.find(t => t.name.toLowerCase().replace(/ /g, '-') === topic)?.name 
    : 'All Topics';

  return (
    <div className="space-y-1">
      <h3 className="px-3 py-2 text-left font-semibold text-accent-purple">Topics</h3>
      
      {/* Mobile dropdown */}
      <div className="block lg:hidden px-3 mb-4">
        <div className="relative">
          <Button 
            variant="outline" 
            className="w-full justify-between bg-background"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="truncate">{currentTopic}</span>
            <ChevronDown className={`ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-2 py-1 bg-white border rounded-md shadow-lg z-50">
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent/50"
                onClick={() => {
                  onAllPostsClick();
                  setIsOpen(false);
                }}
              >
                All Posts
              </button>
              
              {displayedTopics?.map(topicItem => (
                <button
                  key={topicItem.name}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-accent/50 flex justify-between"
                  onClick={() => {
                    onTopicClick(topicItem.name);
                    setIsOpen(false);
                  }}
                >
                  <span>{topicItem.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {topicItem.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
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
