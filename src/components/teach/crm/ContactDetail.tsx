
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Message } from "./types";

interface ContactDetailProps {
  selectedMessage: Message | null;
  studentBookings: any[];
}

export const ContactDetail = ({ selectedMessage, studentBookings }: ContactDetailProps) => {
  if (!selectedMessage) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Select a message to view contact details
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold mb-4 text-left">Contact Information</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>
                {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
              </span>
            </div>
            {selectedMessage.profile?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedMessage.profile.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-base font-semibold mb-4 text-left">Booking History</h3>
          <div className="space-y-3">
            {studentBookings?.map((booking: any) => (
              <Card key={booking.id} className="p-3 bg-neutral-50 border-neutral-200">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{booking.course?.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(booking.created_at), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {selectedMessage.profile?.languages && (
          <div className="border-t pt-6">
            <h3 className="text-base font-semibold mb-4 text-left">Languages</h3>
            <div className="flex gap-2">
              {selectedMessage.profile.languages.map((lang) => (
                <Badge key={lang} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedMessage.profile?.bio && (
          <div className="border-t pt-6">
            <h3 className="text-base font-semibold mb-4 text-left">About</h3>
            <p className="text-sm text-muted-foreground text-left">
              {selectedMessage.profile.bio}
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
