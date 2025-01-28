import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const UserMatches = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Course Matches</h2>
        <BookOpen className="w-5 h-5 text-neutral-400" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">No matches yet</p>
      </div>
    </Card>
  );
};

export default UserMatches;