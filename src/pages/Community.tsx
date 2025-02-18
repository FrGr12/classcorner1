
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityHome from "@/components/community/CommunityHome";
import CommunityExplore from "@/components/community/CommunityExplore";
import CommunityResources from "@/components/community/CommunityResources";

const Community = () => {
  useEffect(() => {
    document.title = "Community - Craftscape";
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
        <p className="text-muted-foreground">
          Explore and share craft knowledge with fellow artisans
        </p>
      </div>

      <Tabs defaultValue="home" className="space-y-4">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <CommunityHome />
        </TabsContent>

        <TabsContent value="explore">
          <CommunityExplore />
        </TabsContent>

        <TabsContent value="resources">
          <CommunityResources />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
