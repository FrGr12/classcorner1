import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Video, Users, Lightbulb } from "lucide-react";
import ResourceCard from "./ResourceCard";

const TeacherLearningHub = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Step-by-step tutorial for setting up your teacher profile and listing your first class.",
      type: "guide",
      icon: BookOpen,
      link: "/teach/learning-hub/getting-started",
    },
    {
      title: "Creating Standout Classes",
      description: "Learn how to write compelling class descriptions and choose great photos.",
      type: "guide",
      icon: Lightbulb,
      link: "/teach/learning-hub/standout-classes",
    },
    {
      title: "Marketing Strategies",
      description: "Promote your classes effectively using SEO, social media, and email marketing.",
      type: "guide",
      icon: Users,
      link: "/teach/learning-hub/marketing",
    },
    {
      title: "Booking Optimization",
      description: "Best practices for pricing, discounts, and student engagement.",
      type: "video",
      icon: Video,
      link: "/teach/learning-hub/bookings",
    },
  ];

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <p className="text-muted-foreground">
          Discover resources, guides, and tutorials to help you succeed as a teacher.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="webinars">Live Webinars</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter((r) => r.type === "guide")
              .map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter((r) => r.type === "video")
              .map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground mb-4">
              Live webinars and Q&A sessions with top instructors will be available soon.
            </p>
            <Button variant="outline">Get Notified</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherLearningHub;