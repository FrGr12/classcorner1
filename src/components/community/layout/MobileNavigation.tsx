
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Hash } from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export const MobileNavigation = ({ activeTab, onTabClick }: MobileNavigationProps) => {
  return (
    <div className="lg:hidden bg-background border rounded-lg mb-6">
      <div className="flex items-center justify-around p-2">
        <Button 
          variant={activeTab === 'topics' ? "subtle" : "ghost"}
          className="flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors" 
          onClick={() => onTabClick('topics')}
        >
          <Hash className="h-5 w-5" />
          <span className="text-sm font-medium">Topics</span>
        </Button>
        <Button 
          variant={activeTab === 'groups' ? "subtle" : "ghost"}
          className="flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors" 
          onClick={() => onTabClick('groups')}
        >
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium">Groups</span>
        </Button>
        <Button 
          variant={activeTab === 'resources' ? "subtle" : "ghost"}
          className="flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors" 
          onClick={() => onTabClick('resources')}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-sm font-medium">Resources</span>
        </Button>
      </div>
    </div>
  );
};
