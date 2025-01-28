import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserSavedClasses = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Saved Classes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Saved Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No saved classes to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSavedClasses;