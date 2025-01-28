import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserMatches = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Course Matches</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recommended Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No course matches to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMatches;