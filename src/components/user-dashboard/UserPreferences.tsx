
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const UserPreferences = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Preferences</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email notifications</Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="reminder-notifications">Class reminders</Label>
            <Switch id="reminder-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-notifications">Marketing communications</Label>
            <Switch id="marketing-notifications" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark mode</Label>
            <Switch id="dark-mode" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPreferences;
