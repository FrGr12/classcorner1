
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityHome from "@/components/community/CommunityHome";
import CommunityDiscussions from "@/components/community/CommunityDiscussions";
import CommunityResources from "@/components/community/CommunityResources";
import CommunityEvents from "@/components/community/CommunityEvents";

const Community = () => {
  useEffect(() => {
    // Set page title
    document.title = "Community - Craftscape";
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
        <p className="text-muted-foreground">
          Connect, share, and learn with fellow crafters and instructors
        </p>
      </div>

      <Tabs defaultValue="home" className="space-y-4">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <CommunityHome />
        </TabsContent>

        <TabsContent value="discussions">
          <CommunityDiscussions />
        </TabsContent>

        <TabsContent value="resources">
          <CommunityResources />
        </TabsContent>

        <TabsContent value="events">
          <CommunityEvents />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
