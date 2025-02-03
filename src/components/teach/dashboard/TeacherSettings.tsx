import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TeacherSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="booking-notifications">Booking Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new bookings
              </p>
            </div>
            <Switch id="booking-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="message-notifications">Message Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new messages
              </p>
            </div>
            <Switch id="message-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="review-notifications">Review Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new reviews
              </p>
            </div>
            <Switch id="review-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="destructive"
            onClick={() => toast.error("This feature is not yet implemented")}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherSettings;