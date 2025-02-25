import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <h3 className="px-3 py-2 text-left font-semibold">Topics</h3>
      
      {/* Mobile dropdown */}
      <div className="block lg:hidden px-3 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="truncate">{currentTopic}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-32px)] max-w-[400px]" align="start">
            <DropdownMenuLabel>Select Topic</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onAllPostsClick}>
              All Posts
            </DropdownMenuItem>
            {displayedTopics?.map(topicItem => (
              <DropdownMenuItem
                key={topicItem.name}
                onClick={() => onTopicClick(topicItem.name)}
                className="flex justify-between"
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
