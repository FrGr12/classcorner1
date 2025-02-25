
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GroupCard } from "@/components/community/groups/GroupCard";
import { Search, Plus, Users, BookOpen, Hash } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DUMMY_GROUPS = [
  {
    id: 1,
    name: "Pottery Enthusiasts",
    description: "A community for pottery lovers to share tips and showcase their work",
    member_count: 156,
    type: "open" as const,
    topic: "Pottery",
    region: "Global"
  },
  {
    id: 2,
    name: "Watercolor Artists",
    description: "Share your watercolor journey and learn from fellow artists",
    member_count: 89,
    type: "open" as const,
    topic: "Painting",
    region: "Global"
  },
  {
    id: 3,
    name: "Textile Arts Collective",
    description: "For those passionate about weaving, knitting, and textile arts",
    member_count: 234,
    type: "private" as const,
    topic: "Textiles",
    region: "Global"
  }
];

export default function Groups() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("groups");

  // Query to fetch user's joined groups
  const { data: joinedGroups, isLoading: isLoadingJoined } = useQuery({
    queryKey: ['joined-groups'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('group_members')
        .select(`
          group_id,
          community_groups (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(item => item.community_groups);
    }
  });

  const handleJoinGroup = async (groupId: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join groups",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: user.id
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already a member",
          description: "You are already a member of this group",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to join group. Please try again.",
          variant: "destructive"
        });
      }
      return;
    }

    toast({
      title: "Success",
      description: "You have successfully joined the group!"
    });
  };

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
                <h1 className="text-4xl font-bold mb-2">Groups</h1>
                <p className="text-muted-foreground">
                  Join groups of like-minded crafters or create your own community
                </p>
              </div>
              <Button onClick={() => navigate('/community/groups/create')} className="bg-accent-purple">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
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

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search groups..." 
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="discover" className="space-y-6">
            <TabsList>
              <TabsTrigger value="discover">Discover Groups</TabsTrigger>
              <TabsTrigger value="joined">My Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="discover" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {DUMMY_GROUPS.map((group) => (
                  <GroupCard
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    description={group.description}
                    memberCount={group.member_count}
                    type={group.type}
                    topic={group.topic}
                    region={group.region}
                    onJoin={handleJoinGroup}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="joined">
              {isLoadingJoined ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : joinedGroups?.length ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {joinedGroups.map((group: any) => (
                    <GroupCard
                      key={group.id}
                      id={group.id}
                      name={group.name}
                      description={group.description}
                      memberCount={group.member_count}
                      type={group.type}
                      topic={group.topic}
                      region={group.region}
                      onJoin={() => navigate(`/community/groups/${group.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No groups joined yet</h3>
                  <p className="text-muted-foreground mt-2">
                    Join some groups to see them here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
