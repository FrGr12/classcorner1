
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Hash } from "lucide-react";
import Navigation from "@/components/landing/Navigation";

export default function Resources() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resources");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    switch (tab) {
      case 'topics':
        navigate('/community/category/all');
        break;
      case 'groups':
        navigate('/community/groups');
        break;
      case 'resources':
        navigate('/community/resources');
        break;
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24">
        <div className="border-b bg-card">
          <div className="container mx-auto py-6 px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Learning Resources</h1>
                <p className="text-muted-foreground">
                  Discover guides, tutorials, and expert tips to enhance your crafting journey
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4">
          {/* Mobile Navigation */}
          <div className="lg:hidden bg-background border rounded-lg mb-6">
            <div className="flex items-center justify-around p-2">
              <Button 
                variant="ghost" 
                className={`flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors
                  ${activeTab === 'topics' 
                    ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' 
                    : 'hover:bg-accent-purple/5'}`}
                onClick={() => handleTabClick('topics')}
              >
                <Hash className="h-5 w-5" />
                <span className="text-sm font-medium">Topics</span>
              </Button>
              <Button 
                variant="ghost"
                className={`flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors
                  ${activeTab === 'groups' 
                    ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' 
                    : 'hover:bg-accent-purple/5'}`}
                onClick={() => handleTabClick('groups')}
              >
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Groups</span>
              </Button>
              <Button 
                variant="ghost"
                className={`flex flex-col items-center w-24 gap-2 h-auto py-2 rounded-lg transition-colors
                  ${activeTab === 'resources' 
                    ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' 
                    : 'hover:bg-accent-purple/5'}`}
                onClick={() => handleTabClick('resources')}
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-medium">Resources</span>
              </Button>
            </div>
          </div>

          {/* Resources Content */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Beginner Guides</h3>
              <p className="text-muted-foreground">Essential guides for getting started with various crafts</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
              <p className="text-muted-foreground">Step-by-step video guides for different techniques</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Expert Tips</h3>
              <p className="text-muted-foreground">Advanced techniques and professional insights</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
