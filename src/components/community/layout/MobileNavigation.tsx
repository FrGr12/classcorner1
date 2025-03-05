
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
          variant="ghost" 
          className={`flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors
            ${activeTab === 'topics' ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' : 'hover:bg-accent-purple/5'}`} 
          onClick={() => onTabClick('topics')}
        >
          <Hash className="h-5 w-5" />
          <span className="text-sm font-medium">Topics</span>
        </Button>
        <Button 
          variant="ghost" 
          className={`flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors
            ${activeTab === 'groups' ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' : 'hover:bg-accent-purple/5'}`} 
          onClick={() => onTabClick('groups')}
        >
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium">Groups</span>
        </Button>
        <Button 
          variant="ghost" 
          className={`flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors
            ${activeTab === 'resources' ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' : 'hover:bg-accent-purple/5'}`} 
          onClick={() => onTabClick('resources')}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-sm font-medium">Resources</span>
        </Button>
      </div>
    </div>
  );
};
