import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Calendar, Trophy } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h1 className="text-4xl font-display font-semibold mb-6">Join Our Community</h1>
            <p className="text-lg text-neutral-600">
              Connect with fellow creators, share experiences, and grow together in our vibrant community.
            </p>
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <Users className="w-8 h-8 text-accent-purple" />
                <h3 className="text-xl font-semibold">Community Forums</h3>
                <p className="text-neutral-600">
                  Join discussions, share tips, and connect with other creators in our community forums.
                </p>
                <Button className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discussion
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <Calendar className="w-8 h-8 text-accent-purple" />
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
                <p className="text-neutral-600">
                  Discover and participate in community events, workshops, and meetups.
                </p>
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Events
                </Button>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Featured Community Members</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <div className="space-y-4">
                    <Trophy className="w-6 h-6 text-accent-purple" />
                    <h3 className="text-lg font-semibold">Featured Creator {i}</h3>
                    <p className="text-sm text-neutral-600">
                      Sharing knowledge and inspiring others through creative classes.
                    </p>
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;