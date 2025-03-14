import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GroupMember {
  id: number;
  group_id: number;
  user_id: string;
  joined_at: string;
  role: string;
  user_profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
}

export default function GroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Validate id is a number
  const groupId = id ? parseInt(id, 10) : null;
  if (!groupId || isNaN(groupId)) {
    navigate('/community/groups');
    return null;
  }

  const { data: group, isLoading: isLoadingGroup } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!groupId && !isNaN(groupId)
  });

  const { data: members = [], isLoading: isLoadingMembers } = useQuery({
    queryKey: ['group-members', groupId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          id,
          group_id,
          user_id,
          joined_at,
          role,
          user_profile:profiles(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('group_id', groupId);

      if (error) throw error;
      
      // Transform the data to match our GroupMember interface
      return (data as any[]).map(member => ({
        ...member,
        profiles: member.user_profile
      })) as GroupMember[];
    },
    enabled: !!groupId && !isNaN(groupId)
  });

  if (isLoadingGroup) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-24">
          <div className="container mx-auto py-8 px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!group) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-24">
          <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold">Group not found</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24">
        <div className="border-b bg-card">
          <div className="container mx-auto py-6 px-4">
            <h1 className="text-4xl font-bold mb-2">{group.name}</h1>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4">
          <Tabs defaultValue="discussions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  Group discussions will be available soon
                </p>
              </div>
            </TabsContent>

            <TabsContent value="members">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members?.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-4 rounded-lg border">
                    <Avatar>
                      <AvatarImage src={member.user_profile?.avatar_url || undefined} />
                      <AvatarFallback>
                        {member.user_profile?.first_name?.[0] || ''}
                        {member.user_profile?.last_name?.[0] || ''}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {member.user_profile?.first_name} {member.user_profile?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photos">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  Photo sharing will be available soon
                </p>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  Group events will be available soon
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
