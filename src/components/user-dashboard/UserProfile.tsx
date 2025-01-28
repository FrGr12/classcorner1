import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile & Preferences</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Profile settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;