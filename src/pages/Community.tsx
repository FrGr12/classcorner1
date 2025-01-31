import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Calendar, Trophy } from "lucide-react";

const Community = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow teachers and students, share experiences, and grow together.
          </p>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="spotlight">Teacher Spotlight</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Discussion Forums
                  </CardTitle>
                  <CardDescription>
                    Join conversations about teaching techniques, class management, and more.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Join Discussion</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Study Groups
                  </CardTitle>
                  <CardDescription>
                    Form or join study groups with other teachers and students.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Find Groups</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Success Stories
                  </CardTitle>
                  <CardDescription>
                    Share and read inspiring stories from our community.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Read Stories</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>
                    Browse and join upcoming community events and workshops.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Calendar</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="spotlight" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
              <p className="text-muted-foreground mb-4">
                Teacher spotlight features will be available soon. Stay tuned to learn from and get inspired by our top instructors!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;