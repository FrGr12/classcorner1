
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GroupPage() {
  const { id } = useParams();

  const { data: group, isLoading: isLoadingGroup } = useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_groups')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['group-members', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          profiles:user_id (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('group_id', id);

      if (error) throw error;
      return data;
    }
  });

  if (isLoadingGroup) {
    return <div>Loading...</div>;
  }

  if (!group) {
    return <div>Group not found</div>;
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
                      <AvatarImage src={member.profiles?.avatar_url} />
                      <AvatarFallback>
                        {member.profiles?.first_name?.[0]}
                        {member.profiles?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {member.profiles?.first_name} {member.profiles?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">Member</p>
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
