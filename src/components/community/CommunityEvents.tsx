
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, PlusCircle, Video, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CommunityEvent {
  id: number;
  title: string;
  description: string;
  event_type: 'webinar' | 'workshop' | 'meetup' | 'other';
  start_time: string;
  end_time: string;
  timezone: string;
  location?: string;
  is_virtual: boolean;
  max_participants?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

const CommunityEvents = () => {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('community_events')
          .select('*')
          .eq('status', 'upcoming')
          .order('start_time', { ascending: true });

        if (error) throw error;
        
        // Add type assertion to ensure data matches our interface
        const typedEvents = (data || []).map(event => ({
          ...event,
          event_type: event.event_type as 'webinar' | 'workshop' | 'meetup' | 'other',
          status: event.status as 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
        }));
        
        setEvents(typedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatEventDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <Button className="bg-accent-purple hover:bg-accent-purple/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground">Loading events...</div>
      ) : events.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {event.is_virtual ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <MapPin className="h-5 w-5" />
                  )}
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatEventDate(event.start_time)}</span>
                  </div>
                  {event.location && (
                    <div className="text-sm text-muted-foreground">
                      {event.is_virtual ? 'Virtual Event' : event.location}
                    </div>
                  )}
                  {event.max_participants && (
                    <div className="text-sm text-muted-foreground">
                      Limited to {event.max_participants} participants
                    </div>
                  )}
                  <Button className="w-full mt-4" variant="outline">
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No upcoming events scheduled. Check back later or create your own event!
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityEvents;
