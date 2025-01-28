import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserMessages = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No messages to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMessages;