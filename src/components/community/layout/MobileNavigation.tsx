
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Hash } from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export const MobileNavigation = ({ activeTab, onTabClick }: MobileNavigationProps) => {
  return (
    <nav className="lg:hidden bg-background border rounded-lg mb-6" aria-label="Mobile navigation">
      <div className="flex items-center justify-around p-2">
        <Button 
          variant={activeTab === 'topics' ? "default" : "ghost"}
          className="flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors" 
          onClick={() => onTabClick('topics')}
          aria-current={activeTab === 'topics' ? 'page' : undefined}
        >
          <Hash className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-medium">Topics</span>
        </Button>
        <Button 
          variant={activeTab === 'groups' ? "default" : "ghost"}
          className="flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors" 
          onClick={() => onTabClick('groups')}
          aria-current={activeTab === 'groups' ? 'page' : undefined}
        >
          <Users className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-medium">Groups</span>
        </Button>
        <Button 
          variant={activeTab === 'resources' ? "default" : "ghost"}
          className="flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors" 
          onClick={() => onTabClick('resources')}
          aria-current={activeTab === 'resources' ? 'page' : undefined}
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-medium">Resources</span>
        </Button>
      </div>
    </nav>
  );
};
