import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GroupCard } from "@/components/community/groups/GroupCard";
import { Search, Plus } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import { useToast } from "@/components/ui/use-toast";
export default function Groups() {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: groups,
    isLoading
  } = useQuery({
    queryKey: ['community-groups', searchQuery],
    queryFn: async () => {
      let query = supabase.from('community_groups').select('*');
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }
      const {
        data,
        error
      } = await query.order('member_count', {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const handleJoinGroup = async (groupId: number) => {
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join groups",
        variant: "destructive"
      });
      return;
    }
    const {
      error
    } = await supabase.from('group_members').insert({
      group_id: groupId,
      user_id: user.id
    });
    if (error) {
      if (error.code === '23505') {
        // Unique violation
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
  return <>
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
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search groups..." className="pl-9 w-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>

          {isLoading ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />)}
            </div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groups?.map(group => <GroupCard key={group.id} id={group.id} name={group.name} description={group.description} memberCount={group.member_count} type={group.type} topic={group.topic} region={group.region} onJoin={handleJoinGroup} />)}
            </div>}
        </div>
      </div>
    </>;
}